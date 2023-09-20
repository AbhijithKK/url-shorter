import ShortUniqueId from 'short-unique-id';

const { randomUUID } = new ShortUniqueId({ length: 10 });


export const ShortUrl=async()=>{
        const uid=await randomUUID();
        const newUrl=`${process.env.URL_SHORT}/${uid}`
        return {newUrl,uid}
};


export const Sanitize = (data) => {
  let sanitized = data.replace(/[^a-zA-Z0-9@]/g, "")
  return sanitized;
};


export const Pagination = async (pageNo,ArrayLength,count) => {
    let skip=(pageNo-1)*count
    let limit=count
    let pages=Math.floor(ArrayLength/count)

  console.log(skip,limit,pages);
  return {skip,limit,pages}
};


