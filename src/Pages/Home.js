import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ImageCard from "../UI/ImageCard";
import PhotoList from "../UI/PhotoList";
import SearchBar from "../UI/SearchBar";
import SearchInput from "../UI/SearchInput";

function Home() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [client] = useOutletContext();

  async function handleOnChange(e) {
    const controller = new AbortController();
    setIsLoading(true);
    const query = e.target.value;
    if (!query) {
      setIsLoading(false);
      return setData({});
    }
    const data = await client.photos.search({
      query,
      per_page: 10,
    });
    setData(data);
    setIsLoading(false);

    return () => {
      controller.abort();
    };
  }

  return (
    <div style={{ textAlign: "center" }}>
      <SearchBar>
        <SearchInput
          type="text"
          onChange={handleOnChange}
          placeholder="Type to search"
        />
      </SearchBar>

      {isLoading && <h1>Loading...</h1>}
      {!isLoading && data.photos && (
        <PhotoList>
          {data.photos.map((photo) => (
            <ImageCard key={photo.id} photo={photo} />
          ))}
        </PhotoList>
      )}
    </div>
  );
}

export default Home;
