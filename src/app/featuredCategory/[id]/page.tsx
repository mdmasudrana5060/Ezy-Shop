const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1>category {params.id}</h1>
      {/* Render product details */}
    </div>
  );
};

export default Page;
