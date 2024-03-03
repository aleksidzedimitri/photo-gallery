import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetPhotosQueryParams {
  query: string;
  page: number;
  per_page: number;
}

interface UserProfileImage {
  small: string;
  medium: string;
  large: string;
}

interface UserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

interface User {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username?: string;
  portfolio_url?: string;
  bio?: string;
  location?: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  profile_image: UserProfileImage;
  links: UserLinks;
}

interface PhotoUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

interface PhotoLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

interface Photo {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash?: string;
  likes: number;
  liked_by_user: boolean;
  description?: string;
  user: User;
  urls: PhotoUrls;
  links: PhotoLinks;
  downloads: number;
  views: number;
}

interface GetPhotosRes {
  total: number;
  total_pages: number;
  results: Photo[];
}

interface PhotoStatistics {
  id: string;
  downloads: {
    total: number;
    historical: {
      change: number;
      resolution: string;
      quantity: number;
      values: Array<{ date: string; value: number }>;
    };
  };
  views: {
    total: number;
    historical: {
      change: number;
      resolution: string;
      quantity: number;
      values: Array<{ date: string; value: number }>;
    };
  };
  likes: {
    total: number;
    historical: {
      change: number;
      resolution: string;
      quantity: number;
      values: Array<{ date: string; value: number }>;
    };
  };
}

const accessKey = "EyLerurLWwNPrw1tRpCQeXTEjw65I9l6EyCCh3OdxGY";

export const unsplashApi = createApi({
  reducerPath: "unsplashApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.unsplash.com" }),
  endpoints: (builder) => ({
    getPhotos: builder.query<GetPhotosRes, GetPhotosQueryParams>({
      query: (data) => ({
        method: "GET",
        url: `/search/photos?client_id=${accessKey}&query=${data.query}&page=${data.page}&paer_page=${data.per_page}`,
      }),
    }),
    getPhotoStatistics: builder.query<PhotoStatistics, string>({
      query: (photoId) =>
        `/photos/${photoId}/statistics?client_id=${accessKey}`,
    }),
  }),
});

export const { useGetPhotosQuery, useGetPhotoStatisticsQuery } = unsplashApi;
