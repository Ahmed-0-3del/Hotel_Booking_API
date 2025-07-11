
export default class ApiFeatuer {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }

    pagination() {
        let page = this.queryString.page * 1 || 1;
        if (page <= 0) page = 1;
        let skip = (page - 1) * 4;
        this.page = page;
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(4);
        return this;
    }

    filter() {
        let filterObj = { ...this.queryString };
        let excludedQuery = ["page", "sort", "keyword", "fields"];
        excludedQuery.forEach((q) => {
            delete filterObj[q];
        });

        filterObj = JSON.stringify(filterObj);
        filterObj = filterObj.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        filterObj = JSON.parse(filterObj);

        this.mongooseQuery = this.mongooseQuery.find(filterObj);
        return this;
    }

    sort() {
        if (this.queryString && this.queryString.sort) {
            let sortBy = this.queryString.sort.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        } else {
            this.mongooseQuery = this.mongooseQuery.sort("-createdAt"); // ترتيب افتراضي
        }
        return this;
    }

    search() {
        if (this.queryString.keyword) {
            const keyword = this.queryString.keyword;
            this.mongooseQuery = this.mongooseQuery.find({
                $or: [
                    { title: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } }
                ]
            });
        }
        return this;
    }

    fields() {
        if (this.queryString.fields) {
            let fields = this.queryString.fields.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.select(fields);
        }
        return this;
    }
}

































// export default class ApiFeatuer{

//     constructor(mongooseQuery,queryString){
//         this.mongooseQuery=mongooseQuery;
//         this.queryString=queryString;
//     }

//     pagination(){
//         let page = this.queryString.page * 1 || 1;
//         if(this.queryString.page <=0) page = 1 ;
//         let skip = (page-1)*4;
//         this.page = page
//         this.mongooseQuery.skip(skip).limit(4);
//         return this ;
//     }


//     filter(){
//         let filterObj = {...this.queryString}
//         let excludedQuery = ["page","sort","keyword","fields"];
//         excludedQuery.forEach((q)=>{
//             delete filterObj[q]
//         })
    
//         filterObj = JSON.stringify(filterObj)
//         filterObj = filterObj.replace(/\bgt|gte|lt|lte\b/g,match=>`$${match}`)
//         filterObj = JSON.parse(filterObj)

//         this.mongooseQuery.find(filterObj)
//         return this;
//     }


//     sort(){
//         if(this.queryString){
//             let sortBy=this.queryString.sort.split(",").join(" ");
//            this.mongooseQuery.sort(sortBy);
//         }
//         return this;
//     }

   
    

//     search(){
//         if(this.queryString.keyword){
//            this.mongooseQuery.find({
//             $or:[
//                 {title:{$regex:req.query.keyword,$option:"i"}},{description:{$regex:req.query.keyword,$option:"i"}}
//             ]
//             })
//           }
//           return this
//     }
 

//     fields(){
//         if(this.queryString.fields){
//             let fields=this.queryString.fields.split(",").join("");
//             this.mongooseQuery.select(fields);
//         }
//         return this;
//     }
// }











