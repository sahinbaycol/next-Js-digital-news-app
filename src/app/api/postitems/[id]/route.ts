import dbConnect from "../../../../../config/db";
import PostItem from "../../../../../models/PostItem";

dbConnect();

export async function GET(_request: Request, { params }: { params: { id: string } }) {

    try {
        const postItem = await PostItem.findById(params.id).select('-__V')

        return Response.json(postItem)
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'No Item Found for this ID' }),
            { status: 404 }
        )
    }
}

export async function PUT(request: Request, { params }: { params: { id: string; } }) {

    const updatedItem = await request.json();

    try {
        const postItem = await PostItem.findByIdAndUpdate(params.id, { ...updatedItem })
        if (!postItem)
            return new Response(JSON.stringify({ message: "No Item Found for this ID" }),
                {
                    status: 404,
                })

        return new Response(JSON.stringify(postItem), {
            headers: {
                "Content-Type": "application/json",

            },
            status: 200
        })
    } catch (error) {
        return new Response(JSON.stringify({ messega: 'SERVER ERROR' }),
            {
                status: 500,
            })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {

    try {
        const postItem = await PostItem.findByIdAndDelete(params.id)
        if (!postItem)
            return new Response(JSON.stringify({ message: "No Item Found for this ID" }),
                {
                    status: 404,
                })

        return new Response(JSON.stringify(postItem), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        })
    } catch (error) {
        return new Response(JSON.stringify({ messega: 'SERVER ERROR' }),
            {
                status: 500,
            })
    }
}