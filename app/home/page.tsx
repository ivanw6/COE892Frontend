"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import "./home.css";

type Book = {
    id: string;
    title: string;
    author: string;
    genre: string;
    year: number;
    image: string;
    available: boolean;
};

export default function HomePage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState<keyof Book>("title");
    const [ascending, setAscending] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    const router = useRouter();
    const mockAPI = "https://69adfc01b50a169ec880ab7a.mockapi.io/books";

    useEffect(() => {
        fetch(mockAPI)
            .then((res) => res.json())
            .then((data) => setBooks(data));
    }, []);

    const filteredBooks = useMemo(() => {
        const filtered = books.filter((book) =>
            String(book.title).toLowerCase().includes(search.toLowerCase()) ||
            String(book.author).toLowerCase().includes(search.toLowerCase()) ||
            String(book.genre).toLowerCase().includes(search.toLowerCase())
        );

        filtered.sort((a, b) => {
            const valA = String(a[sortField]);
            const valB = String(b[sortField]);

            if (valA < valB) return ascending ? -1 : 1;
            if (valA > valB) return ascending ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [books, search, sortField, ascending]);

    function handleSort(field: keyof Book) {
        if (field === sortField) {
            setAscending(!ascending);
        } else {
            setSortField(field);
            setAscending(true);
        }
    }

    // placeholder for api call to update db on borrow event
    function handleBorrow(book: Book) {
        console.log(`Borrowing: ${book.title}`);
    }

    return (
        <div className="library-container">
            <h1 className="library-title">Home Page</h1>

            <div className="top-bar">
                <input
                    className="search-bar"
                    placeholder="Search books..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {loggedIn ? (
                    <button className="account-button">Account</button>
                ) : (
                    <div className="auth-buttons">
                        <button className="account-button">Login</button>
                        <button className="account-button" onClick={() => router.push("/signup")}>Sign Up</button>
                    </div>
                )}
            </div>

            <table className="book-table">
                <thead>
                    <tr>
                        <th>Book cover</th>
                        <th onClick={() => handleSort("title")}>Title</th>
                        <th onClick={() => handleSort("author")}>Author</th>
                        <th onClick={() => handleSort("genre")}>Genre</th>
                        <th onClick={() => handleSort("year")}>Year</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredBooks.map((book) => (
                        <tr key={book.id}>
                            <td>
                                <img
                                    src={book.image}
                                    className="book-cover"
                                    alt={book.title}
                                />
                            </td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.genre}</td>
                            <td>{book.year}</td>

                            <td>
                                {book.available ? (
                                    <button
                                        className="account-button"
                                        onClick={() => handleBorrow(book)}
                                    >
                                        Borrow
                                    </button>
                                ) : (
                                    <span style={{ color: "#8b6f6f" }}>
                                        Unavailable
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
