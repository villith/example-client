import axios from 'axios';
import { Response } from 'express';
import type { ListingController } from 'example-api/dist/controllers';

type Handler = (_: any, response: Response) => Response;

type Y<T extends Response> = T extends Response<infer P> ? P : never;

type U<T extends Handler> = Y<ReturnType<T>>;

const API = {
  GET: {
    listings: async () => {
      const { data } = await axios.get<U<ListingController.listings['handler']>>(ListingController.listings.route);
      return data;
    },
    mappedListings: async () => {
      const { data } = await axios.get<U<ListingController.mappedListings['handler']>>(ListingController.mappedListings.route);
      return data;
    }
  }
};

(async () => {
  const listings = await API.GET.listings();
  listings.forEach((listing) => console.log(listing.line1));

  const mappedListings = await API.GET.mappedListings();
  Object.entries(mappedListings).forEach(([id, listing]) => console.log(listing.line1));
})();