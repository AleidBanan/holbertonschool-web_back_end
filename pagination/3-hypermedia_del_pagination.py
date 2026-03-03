#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination.

This module provides a Server class that paginates a dataset while remaining
consistent even if rows are deleted between requests.
"""

import csv
from typing import Dict, List, Optional


class Server:
    """Server class to paginate a database of popular baby names."""
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self) -> None:
        """Initialize the server with empty dataset caches."""
        self.__dataset: Optional[List[List]] = None
        self.__indexed_dataset: Optional[Dict[int, List]] = None

    def dataset(self) -> List[List]:
        """Return the cached dataset loaded from the CSV file."""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]
        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Return a dataset indexed by original sorting position, starting at 0."""
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            self.__indexed_dataset = {i: dataset[i] for i in range(len(dataset))}
        return self.__indexed_dataset

    def get_hyper_index(
        self, index: Optional[int] = None, page_size: int = 10
    ) -> Dict:
        """
        Return deletion-resilient pagination data starting from a given index.

        The returned dictionary contains the current index, the next index to
        query, the page size, and the actual data rows.
        """
        if index is None:
            index = 0

        assert isinstance(index, int) and index >= 0
        assert isinstance(page_size, int) and page_size > 0

        indexed = self.indexed_dataset()
        assert index < len(self.dataset())

        data: List[List] = []
        current = index

        while len(data) < page_size and current < len(self.dataset()):
            if current in indexed:
                data.append(indexed[current])
            current += 1

        return {
            "index": index,
            "next_index": current,
            "page_size": len(data),
            "data": data,
        }
