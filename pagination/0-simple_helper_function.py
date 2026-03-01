#!/usr/bin/env python3
"""Module that provides pagination index ranges."""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Return the start and end index for pagination."""
    start = (page - 1) * page_size
    end = start + page_size
    return (start, end)
