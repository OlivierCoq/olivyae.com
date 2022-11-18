# OliVyae.com

Music website. Contains Firebase hosted files as well as database. In addition, contains a custom-built admin in subdomain that edits data. Both Admin and Front End are built with same stack:

## Front End:

- NuxtJS
- Bootstrap 5
- FontAwesome

## Back End

- Google FireStore for storage
	- Tracks
		- ID
		- Sound File
		- Album 
- Google FireBase for data
	- Filters (array of objects)
	- Track IDs
	- Albums
		- ID
		- Art
		- array of Track IDs
