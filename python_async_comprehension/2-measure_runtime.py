#!/usr/bin/env python3
"""Module to measure runtime of async comprehension."""

import asyncio
import time

async_comprehension = __import__(
    "1-async_comprehension"
).async_comprehension


async def measure_runtime() -> float:
    """Measure total runtime of running async_comprehension 4 times."""
    start = time.time()

    await asyncio.gather(
        async_comprehension(),
        async_comprehension(),
        async_comprehension(),
        async_comprehension(),
    )

    end = time.time()
    return end - start
