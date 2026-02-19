#!/usr/bin/env python3
"""Measure runtime of async comprehension."""

import asyncio
import time

async_comprehension = __import__(
    "1-async_comprehension"
).async_comprehension


async def measure_runtime() -> float:
    """Run async_comprehension 4 times in parallel."""
    start = time.time()

    await asyncio.gather(
        *(async_comprehension() for _ in range(4))
    )

    end = time.time()
    return end - start
