"""Generate themed logistics photos for the resume site.

Saves wide background images into cv/img/. Already-existing files are skipped,
so reruns are cheap. Primary: OpenAI DALL-E 3 (falls back to dall-e-2).
Keys are read from ~/.claude/settings.json (OPENAI_API_KEY).
"""
import base64
import json
import os
import sys
from pathlib import Path

IMG_DIR = Path(__file__).resolve().parents[1] / "img"
IMG_DIR.mkdir(parents=True, exist_ok=True)

CINEMATIC = (
    "Cinematic professional photograph, dramatic lighting, ultra realistic, "
    "high detail, muted teal-and-amber color grade, shallow depth of field, "
    "no text, no watermark, no logos. "
)

JOBS = {
    "hero-highway": (
        "A modern white semi truck with trailer driving on a wet asphalt motorway "
        "at dusk, glowing headlights and tail lights, long exposure light trails, "
        "wide cinematic shot, European highway, dramatic sky. " + CINEMATIC
    ),
    "euro-route": (
        "A semi truck crossing a European countryside highway during golden hour, "
        "rolling green hills, distant mountains, freight logistics, wide aerial view. "
        + CINEMATIC
    ),
    "container-port": (
        "A busy international container seaport terminal at blue hour, towering ship-to-shore "
        "cranes, stacks of colorful shipping containers, a cargo vessel, reflective water. "
        + CINEMATIC
    ),
    "border-customs": (
        "A line of cargo trucks waiting at an international border customs checkpoint, "
        "barrier gates, inspection booths, overcast morning, freight and customs theme. "
        + CINEMATIC
    ),
    "fleet-trucks": (
        "A neat row of parked modern semi trucks of a logistics fleet in a depot at dawn, "
        "clean reflective cabs, symmetrical composition, wide shot. " + CINEMATIC
    ),
    "warehouse": (
        "Interior of a large modern logistics distribution warehouse, tall racking with "
        "palletized goods, a forklift, clean concrete floor, leading lines, soft industrial light. "
        + CINEMATIC
    ),
}

SIZE = "1792x1024"


def load_key() -> str:
    p = Path(os.path.expanduser("~/.claude/settings.json"))
    d = json.loads(p.read_text(encoding="utf-8"))
    env = d.get("env", d)
    key = env.get("OPENAI_API_KEY") or d.get("OPENAI_API_KEY")
    if not key:
        sys.exit("No OPENAI_API_KEY found in settings.json")
    return key


def main():
    import httpx
    from openai import OpenAI

    # The shell env may export an unsupported SOCKS4 proxy; bypass env proxies.
    http_client = httpx.Client(trust_env=False, timeout=httpx.Timeout(180.0))
    client = OpenAI(api_key=load_key(), http_client=http_client)
    todo = {n: pr for n, pr in JOBS.items() if not (IMG_DIR / f"{n}.png").exists()}
    if not todo:
        print("all images already present, nothing to do")
        return
    print(f"generating {len(todo)} images: {', '.join(todo)}")

    for name, prompt in todo.items():
        out = IMG_DIR / f"{name}.png"
        ok = False
        for model, size, extra in (
            ("gpt-image-1", "1536x1024", {"quality": "high"}),
            ("dall-e-3", "1792x1024", {"quality": "hd"}),
            ("dall-e-3", "1024x1024", {}),
        ):
            try:
                resp = client.images.generate(
                    model=model, prompt=prompt, n=1, size=size, **extra
                )
                data = resp.data[0]
                if getattr(data, "b64_json", None):
                    out.write_bytes(base64.b64decode(data.b64_json))
                else:
                    r = http_client.get(data.url)
                    r.raise_for_status()
                    out.write_bytes(r.content)
                print(f"  OK  {name} <- {model} ({size})")
                ok = True
                break
            except Exception as e:
                print(f"  .. {name} via {model} failed: {str(e)[:140]}")
        if not ok:
            print(f"  XX {name}: all providers failed (site will use CSS fallback)")

    print("done")


if __name__ == "__main__":
    main()
