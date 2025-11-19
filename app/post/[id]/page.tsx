// app/post/[id]/page.tsx

export default function PostPage({ params }: any) {
  return "TEST POST PAGE – ID: " + (params?.id ?? "pa ID");
}
