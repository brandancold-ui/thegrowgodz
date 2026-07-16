#!/usr/bin/env python3
"""Mirror source images as web-ready WebP assets without touching originals."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageOps


SUPPORTED_SUFFIXES = {".jpg", ".jpeg", ".png"}
DEFAULT_MAX_EDGE = 2000
MAX_EDGE_OVERRIDES = {
    "grow-godz-crown-logo-white": 1000,
    "grow-godz-cannabis-flower-hero-large-logo": 2400,
    "grow-godz-cannabis-flower-hero-subtle-logo": 2400,
    "grow-godz-indoor-cannabis-grow-tent-setup": 2200,
}


def output_path(source_root: Path, output_root: Path, source: Path) -> Path:
    return (output_root / source.relative_to(source_root)).with_suffix(".webp")


def optimize_image(source: Path, destination: Path, quality: int) -> tuple[int, int]:
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        max_edge = MAX_EDGE_OVERRIDES.get(source.stem, DEFAULT_MAX_EDGE)

        if max(image.size) > max_edge:
            image.thumbnail((max_edge, max_edge), Image.Resampling.LANCZOS)

        has_alpha = image.mode in {"RGBA", "LA"} or "transparency" in image.info
        image = image.convert("RGBA" if has_alpha else "RGB")
        destination.parent.mkdir(parents=True, exist_ok=True)

        save_options = {
            "format": "WEBP",
            "method": 6,
            "quality": quality,
        }
        if source.stem == "grow-godz-crown-logo-white":
            save_options["lossless"] = True
        elif has_alpha:
            save_options["alpha_quality"] = 100

        icc_profile = opened.info.get("icc_profile")
        if icc_profile:
            save_options["icc_profile"] = icc_profile

        image.save(destination, **save_options)
        return image.size


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, default=Path("assets/images/originals"))
    parser.add_argument("--output", type=Path, default=Path("assets/images/webp"))
    parser.add_argument("--quality", type=int, default=88)
    args = parser.parse_args()

    sources = sorted(
        path for path in args.source.rglob("*") if path.suffix.lower() in SUPPORTED_SUFFIXES
    )
    if not sources:
        raise SystemExit(f"No source images found under {args.source}")

    for source in sources:
        destination = output_path(args.source, args.output, source)
        width, height = optimize_image(source, destination, args.quality)
        print(f"{source} -> {destination} ({width}x{height})")


if __name__ == "__main__":
    main()
