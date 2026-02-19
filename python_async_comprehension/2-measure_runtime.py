#!/usr/bin/env python3
"""
Module that imports function
and measures the total execution time
"""


import asyncio
import time
from typing import Callable
wait_n = __import__('1-concurrent_coroutines').wait_n


def measure_time(n: int, max_delay: int) -> float:
    """Return average runtime of wait_n"""
    start = time.time()

    asyncio.run(wait_n(n, max_delay))

    end = time.time()

    total_time = end - start
    return total_time / n
