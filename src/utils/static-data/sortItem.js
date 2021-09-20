const sortItem = [
    {
        display:"Name: A - Z",
        value: {_sort:'name', _order:'asc'}
    },
    {
        display:"Name: Z - A",
        value: {_sort:'name', _order:'desc'}

    },
    {
        display:"Price: Low to High",
        value: {_sort:'price', _order:'asc'}
    },
    {
        display:"Price: High to Low",
        value: {_sort:'price', _order:'desc'}

    },
    {
        display:"Rating: Low to High",
        value: {_sort:'rate', _order:'asc'}
    },
    {
        display:"Rating: High to Low",
        value: {_sort:'rate', _order:'desc'}
    }
]
export default sortItem