/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class DeezerService {
  constructor(private readonly prisma: PrismaService) {}

  async fetchAndStoreAlbumsBySearch(searchTerm: string) {
   try {
     const response = await axios.get(`https://deezerdevs-deezer.p.rapidapi.com/search`, {
       params: { q: searchTerm },
       headers: {
         'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
         'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
       },
     });
 
     const albumsData = response.data.data;
     if (!albumsData || albumsData.length === 0) {
       throw new Error('No albums found for this search term.');
     }
 
     const storedAlbums = [];
     for (const album of albumsData) {
       const existingAlbum = await this.prisma.album.findFirst({
         where: {
           album_title: album.album.title,
           artist_name: album.artist.name,
         },
       });
 
       if (existingAlbum) {
         console.log(`Album "${album.album.title}" by ${album.artist.name} already exists in the database.`);
         storedAlbums.push(existingAlbum);
         continue;
       }
 
       const albumResponse = await axios.get(`https://deezerdevs-deezer.p.rapidapi.com/album/${album.album.id}`, {
         headers: {
           'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
           'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
         },
       });
 
       const albumDetails = albumResponse.data;
 
       const albumToStore = {
         album_cover_image: albumDetails.cover,
         album_cover_small:  albumDetails.cover_small,
         album_cover_medium: albumDetails.cover_medium,
         album_cover_big: albumDetails.cover_big,
         album_title: albumDetails.title,
         artist_name: albumDetails.artist.name,
         release_date: new Date(albumDetails.release_date),
         tracks: {
           create: albumDetails.tracks.data.map((track) => ({
             title: track.title,
             duration: track.duration,
             preview: track.preview,
           })),
         },
       };
 
       const storedAlbum = await this.prisma.album.create({
         data: albumToStore,
       });
       storedAlbums.push(storedAlbum);
     }
 
     return storedAlbums;
   } catch (error) {
     console.error("Error fetching/storing albums:", error);
     throw error;
   }
 }
 
}