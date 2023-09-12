export const Sanitize = async (data) => {
  let sanitized = await data
    .replace(/[^a-zA-Z]/g, "")
    .replace(/[^a-zA-Z]/g, "");
  return sanitized;
};
export const Pagination = async (pageNo,ArrayLength,count) => {
    let skip=(pageNo-1)*limit
    let limit=count
    let pages=Math.floor(ArrayLength/count)

  
  return {skip,limit,pages}
};

