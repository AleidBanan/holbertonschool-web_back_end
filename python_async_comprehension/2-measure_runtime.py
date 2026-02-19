#!/usr/bin/env python3
"""Module for measure_runtime coroutine."""

import asyncio
import time

async_comprehension = __import__('1-async_comprehension').async_comprehension


async def measure_runtime() -> float:
    """Measure total runtime of executing async_comprehension four times."""
    start_time = time.perf_counter()

    await asyncio.gather(
        async_comprehension(),
        async_comprehension(),
        async_comprehension(),
        async_comprehension(),
    )

    end_time = time.perf_counter()
    return end_time - start_time
