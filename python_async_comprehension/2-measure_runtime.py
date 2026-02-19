#!/usr/bin/env python3
"""
This module provides a function to measure time.
"""
import asyncio
import time

wait_n = __import__('1-concurrent_coroutines').wait_n


def measure_time(n: int, max_delay: int) -> float:
    """
    Uses n and max_delay integers as arguments,
    Returns total_time as a float.
    """
    start_time = time.perf_counter()
    asyncio.run(wait_n(n, max_delay))
    end_time = time.perf_counter()

    total_time = start_time - end_time
    return total_time / n
