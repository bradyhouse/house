import _ from 'lodash'

import Locations from '../stores/locations'

export default class NoRestApi {
  /**
   * Filters an array of location objects based on criteria and returns paginated results
   *
   * @param {Array<Object>} items - Array of location objects to filter
   * @param {Object} [criteria={}] - Filtering criteria object where keys match item properties
   * @param {number}[pageNumber=1] - Target page number
   * @param {number} [pageSize=50] - Number of items per page
   * @returns {Object} Paginated results with filtered items
   */
  static paginateFilteredItems(items, criteria = {}, pageNumber = 1, pageSize = 50) {
    let filteredItems = items

    if (Object.entries(criteria).length > 0) {
      // Filter items based on criteria
      filteredItems = items.filter((item) => {
        const matches = []
        // Check each criterion against the corresponding item property
        Object.entries(criteria).every(([key, value]) => {
          // Handle both string and numeric comparisons
          const itemValue = item[key]
          if (typeof value === 'string') {
            if (String(value).toLowerCase().includes(itemValue.toLowerCase())) {
              matches.push(key)
            }
          } else if (itemValue === value) {
            matches.push(key)
          }
        })
        if (matches.length > 0) {
          return true
        }
        return false
      })
    }

    // Calculate pagination metadata
    const totalCount = filteredItems.length
    const totalPages = Math.ceil(totalCount / pageSize)
    const currentPage = pageNumber

    // Get items for current page
    const startIndex = (currentPage - 1) * pageSize
    const paginatedItems = filteredItems.slice(startIndex, startIndex + pageSize)

    // Return formatted result
    return {
      Items: paginatedItems,
      TotalCount: totalCount,
      PageSize: pageSize,
      CurrentPage: currentPage,
      TotalPages: totalPages,
      HasPreviousPage: currentPage > 1,
      HasNextPage: currentPage < totalPages
    }
  }

  static sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async getPage(req) {
    return new Promise((resolveFn) => {
      const response = Api.paginateFilteredItems(
        Locations.json(),
        req.searchCriteria,
        req.pageNumber,
        50
      )
      Api.sleep(5000).then(() => {
        resolveFn(response)
      })
    })
  }
}
