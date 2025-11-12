import { useState } from "react";
import SearchBar from "../SearchBar";

export default function SearchBarExample() {
  const [search, setSearch] = useState("");

  return (
    <div className="p-8 bg-background flex justify-center">
      <SearchBar
        value={search}
        onChange={(val) => {
          setSearch(val);
          console.log("Search value:", val);
        }}
        placeholder="Search by skill (e.g., electrical, plumbing)..."
      />
    </div>
  );
}
