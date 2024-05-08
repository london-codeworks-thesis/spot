import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET () {
  const result = await prisma.user.findMany();
  return NextResponse.json(result);
}

export async function POST() {
  const result = 'post';
  return NextResponse.json(result);
}


// export default async function handle(req, res) {
//   const { title, content } = req.body;

//   const session = await getSession({ req });
//   const result = await prisma.post.create({
//     data: {
//       title: title,
//       content: content,
//       author: { connect: { email: session?.user?.email } },
//     },
//   });
//   res.json(result);
// }
