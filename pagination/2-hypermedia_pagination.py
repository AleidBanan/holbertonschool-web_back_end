#!/usr/bin/env python3
"""Module that implements hypermedia pagination for a CSV dataset."""

import csv
import math
from typing import Dict, List, Optional

index_range = __import__('0-simple_helper_function').index_range


class Server:
    """Server class used to paginate a dataset of popular baby names."""
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self) -> None:
        """Initialize the server with an empty dataset cache."""
        self.__dataset: Optional[List[List[str]]] = None

    def dataset(self) -> List[List[str]]:
        """Return the cached dataset loaded from the CSV file."""
        if self.__dataset is None:
            with open(self.DATA_FILE, newline="") as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]
        return self.__dataset

    def get_page(self, page: int = 1,
                 page_size: int = 10) -> List[List[str]]:
        """Return a page of the dataset based on page and page size."""
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        start, end = index_range(page, page_size)
        return self.dataset()[start:end]

    def get_hyper(self, page: int = 1,
                  page_size: int = 10) -> Dict[str, object]:
        """Return pagination metadata and page data in dictionary form."""
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        data = self.get_page(page, page_size)

        total_items = len(self.dataset())
        total_pages = math.ceil(total_items / page_size)

        prev_page: Optional[int] = page - 1 if page > 1 else None
        next_page: Optional[int] = page + 1 if page < total_pages else None

        return {
            "page_size": len(data),
            "page": page,
            "data": data,
            "next_page": next_page,
            "prev_page": prev_page,
            "total_pages": total_pages,
        }
