#!/usr/bin/env python3
"""Async comprehension that collects values from async_generator."""

from typing import List

async_generator = __import__("0-async_generator").async_generator


async def async_comprehension() -> List[float]:
    """Collect 10 random floats from async_generator."""
    return [value async for value in async_generator()]
