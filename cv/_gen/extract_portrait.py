"""Extract the headshot portrait from the source resume PDF -> cv/img/portrait.jpg

Strategy:
1. Pull every embedded raster on page 1, keep candidates that look like a photo
   (reasonable size, roughly portrait/square aspect).
2. Pick the best candidate (largest area among portrait-ish images near the top).
3. Fallback: render page 1 at high DPI and crop the top-left headshot region.
"""
import sys
from pathlib import Path

import fitz  # PyMuPDF
from PIL import Image
import io

PDF = Path(r"C:\Users\exxck\Desktop\Rezyume_Menedzher_po_logistike_i_VED_Evgenii_Semenov_ot_12-06-2026_23-25.pdf")
OUT = Path(__file__).resolve().parents[1] / "img" / "portrait.jpg"


def save_jpg(img: Image.Image, path: Path):
    img = img.convert("RGB")
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "JPEG", quality=92)
    print(f"saved {path}  size={img.size}")


def try_embedded(doc) -> bool:
    page = doc[0]
    best = None  # (score, PIL image)
    for xref, *_ in page.get_images(full=True):
        try:
            base = doc.extract_image(xref)
        except Exception:
            continue
        try:
            img = Image.open(io.BytesIO(base["image"]))
        except Exception:
            continue
        w, h = img.size
        if w < 80 or h < 80:
            continue
        aspect = w / h
        # headshot: roughly square to portrait (0.6 .. 1.2)
        if not (0.55 <= aspect <= 1.3):
            continue
        score = w * h
        if best is None or score > best[0]:
            best = (score, img)
    if best:
        save_jpg(best[1], OUT)
        return True
    return False


def render_crop(doc):
    page = doc[0]
    # render at high DPI
    mat = fitz.Matrix(300 / 72, 300 / 72)
    pix = page.get_pixmap(matrix=mat)
    img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    W, H = img.size
    # headshot sits in the top-left block of the hh.ru layout
    box = (int(W * 0.045), int(H * 0.085), int(W * 0.175), int(H * 0.215))
    crop = img.crop(box)
    save_jpg(crop, OUT)


def main():
    doc = fitz.open(PDF)
    if not try_embedded(doc):
        print("no embedded headshot found, rendering+cropping page 1")
        render_crop(doc)


if __name__ == "__main__":
    main()
