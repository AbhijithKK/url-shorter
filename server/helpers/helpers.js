import ShortUniqueId from 'short-unique-id';

const { randomUUID } = new ShortUniqueId({ length: 10 });


export const RandomId=async()=>{
        const uid=await randomUUID();
        return uid
}
export const Sanitize = async (data) => {
  let sanitized = await data
    .replace(/[^a-zA-Z0-9@]/g, "")
    .replace(/[^a-zA-Z0-9@]/g, "");
  return sanitized;
};
export const Pagination = async (pageNo,ArrayLength,count) => {
    let skip=(pageNo-1)*limit
    let limit=count
    let pages=Math.floor(ArrayLength/count)

  
  return {skip,limit,pages}
};


