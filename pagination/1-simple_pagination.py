def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
    """Return a page of the dataset."""
    assert isinstance(page, int) and page > 0
    assert isinstance(page_size, int) and page_size > 0

    data = self.dataset()
    start, end = index_range(page, page_size)

    return data[start:end]
