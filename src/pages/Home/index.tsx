import { useState, useEffect, useCallback, useRef } from "react";
import Input from "../../components/inputs/Input";
import { SearchIcon } from "lucide-react";
import {
  useGetPhotoStatisticsQuery,
  useGetPhotosQuery,
} from "../../libs/redux/api";
import { useDispatch } from "react-redux";
import { addSearchTerm } from "../../libs/redux/searchHistorySlice";
import { useLocation } from "react-router";
import Modal, { ModalHandles } from "../../components/Modal";

export default function HomePage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [selectedPhotoId, setSelectedPhotoId] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [photos, setPhotos] = useState<any[]>([]);
  const [likes, setLikes] = useState<number>();
  const [page, setPage] = useState(1);
  const modalRef = useRef<ModalHandles>(null);

  const { data: statisticsData } = useGetPhotoStatisticsQuery(selectedPhotoId, {
    skip: !selectedPhotoId,
  });

  const { data: queryData, isLoading } = useGetPhotosQuery({
    query: debouncedSearchTerm,
    page,
    per_page: 20,
  });

  const openModal = (photoId: string, imageUrl: string) => {
    const selectedPhoto = photos.find(
      (photo) => photo.urls.regular === imageUrl
    );
    if (selectedPhoto) {
      setLikes(selectedPhoto.likes);
      setSelectedPhotoId(photoId);
      setSelectedImage(imageUrl);
      modalRef.current?.open();
    }
  };

  const closeModal = () => {
    setSelectedImage("");
    setSelectedPhotoId("");
    modalRef.current?.close();
  };
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
    setPage(1);
  }

  useEffect(() => {
    if (location.state?.term) {
      const termFromHistory = location.state.term;
      setSearchInput(termFromHistory);
      setDebouncedSearchTerm(termFromHistory);
      dispatch(addSearchTerm(termFromHistory));
    }
  }, [location, dispatch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchInput.trim()) {
        setPhotos([]);
        dispatch(addSearchTerm(searchInput));
        setDebouncedSearchTerm(searchInput);
      }
    }, 1200);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput, dispatch]);

  useEffect(() => {
    if (queryData?.results) {
      setPhotos((prevPhotos) => [...prevPhotos, ...queryData.results]);
    }
  }, [queryData]);

  const loadMorePhotos = useCallback(() => {
    if (!isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMorePhotos();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMorePhotos]);

  return (
    <div>
      <Input
        type="text"
        placeholder="Search"
        onChange={handleChange}
        value={searchInput}
        icon={<SearchIcon size={24} />}
        className="mt-8"
      />
      <div className="mt-16">
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={photo.urls.regular}
            alt={photo.alt_description}
            onClick={() => openModal(photo.id, photo.urls.regular)}
            className="cursor-pointer"
          />
        ))}
        {isLoading && <p>Loading...</p>}
      </div>
      {selectedImage && (
        <Modal
          ref={modalRef}
          buttonCaption="Close"
          onClose={closeModal}
          likes={likes}
          downloads={statisticsData?.downloads.total}
          views={statisticsData?.views.total}
        >
          <img src={selectedImage} alt="Selected" />
        </Modal>
      )}
    </div>
  );
}
