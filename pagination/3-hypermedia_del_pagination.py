def get_hyper_index(
    self, index: Optional[int] = None, page_size: int = 10
) -> Dict[str, object]:
    """
    Return deletion-resilient pagination data starting from index.
    """
    if index is None:
        index = 0

    assert isinstance(index, int) and index >= 0
    assert isinstance(page_size, int) and page_size > 0

    indexed = self.indexed_dataset()
    assert index < len(self.dataset())

    data: List[List] = []
    current = index
    max_index = max(indexed.keys())

    while len(data) < page_size and current <= max_index:
        if current in indexed:
            data.append(indexed[current])
        current += 1

    return {
        "index": index,
        "next_index": current,
        "page_size": len(data),
        "data": data,
    }
