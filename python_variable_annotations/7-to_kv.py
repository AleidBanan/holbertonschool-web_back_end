#!/usr/bin/env python3
"""Convert key and value into a tuple with squared value."""

from typing import Union, Tuple


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """Return a tuple with string and squared float value."""
    return (k, float(v ** 2))
