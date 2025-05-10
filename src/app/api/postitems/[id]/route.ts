import dbConnect from "../../../../../config/db";
import PostItem from "../../../../../models/PostItem";

dbConnect();

export async function GET(_request: Request, { params }: { params: { id: string } }) {

    try {
        const postItem = await PostItem.findById(params.id).select('-__V')

        return Response.json(postItem)
    } catch (error) {
        return new Response(
            JSON.stringify({message:'No Item Found for this ID'}),
            { status:404}
        )
    }
}