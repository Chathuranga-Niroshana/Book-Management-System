import BookSIngleCard from "./BookSIngleCard";

function BookCard({ books }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((item) => (
        <BookSIngleCard key={item._id} book={item} />
      ))}
    </div>
  );
}

export default BookCard;
