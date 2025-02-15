const getProducts = async (searchOptions) => {
    let {id, name, db} = searchOptions;
    let productsQuery = db
    .select()
    .from("products")

    if (id){
        productsQuery.where("ID", id);        
    }

    if (name){
        productsQuery.where("name", name);
    }

    return productsQuery
}

const getTotals = async (searchOptions) => {
    let {productId, companyId, issueId, stateId, orderBy} = searchOptions;
    let totalsQuery = db
    .select("complaints.productID", "products.name")
    .count('* as total')
    .from("complaints")
    .innerJoin('products', 'complaints.productID', 'products.ID')

    if (productId){
        totalsQuery.where("productID", productId);        
    }

    if (companyId){
        totalsQuery.where("companyID", companyId);
    }

    if(issueId){
        totalsQuery.where("issueID", issueId);
    }

    if(stateId){
        totalsQuery.where("stateID", stateId);
    }

    if (orderBy === "-total"){
        totalsQuery.orderBy("total", "desc")
    }
    if (orderBy === "total"){
        totalsQuery.orderBy("total", "asc")
    }

    totalsQuery.groupBy("productID")

    return totalsQuery

}

exports.getProducts = getProducts;
exports.getTotals = getTotals