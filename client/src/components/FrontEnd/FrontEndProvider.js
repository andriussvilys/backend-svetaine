import React from 'react';
import axios from 'axios'

export const Context = React.createContext();

export class Provider extends React.Component{
  constructor(props){
    super(props);
  //   this.state = {
  //     "relatedArtwork": {
  //       "gradient_acephale": {
  //         "files": {},
  //         "column": {
  //           "fileIds": [],
  //           "id": "gradient_acephale-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "gradient_acephale-relatedArtworks"
  //         ]
  //       },
  //       "Galaxy Watch": {
  //         "files": {},
  //         "column": {
  //           "fileIds": [],
  //           "id": "Galaxy Watch-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Galaxy Watch-relatedArtworks"
  //         ]
  //       },
  //       "Cherry": {
  //         "files": {
  //           "cherry1.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "graphics"
  //               ],
  //               "listitems": [
  //                 "cg"
  //               ],
  //               "themes": [
  //                 "fruit"
  //               ],
  //               "year": "2018",
  //               "location": "Panevėžys, Lithuania"
  //             },
  //             "artworkFamily": "Cherry",
  //             "displayMain": true,
  //             "themes": [
  //               "fruit"
  //             ],
  //             "seeAlso": [
  //               "201911281605236_BGFC2LL5.jpg",
  //               "20170723_120614.jpg",
  //               "20170817_172102.jpg",
  //               "2019_superbig_00_see_the_bigger_picture_PC.jpg",
  //               "galaxy-watch-active2-hr-monitoring-sensor-effect.png",
  //               "im0035_explore_article-thumbnail_pc_1440x1060.jpg"
  //             ],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2018",
  //             "_id": "5df6cc83266b6a2cf4384b4f",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "cg",
  //                   "print material"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/cherry1.jpg",
  //             "fileName": "cherry1.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "A Christmas present I made for my brother Darius and his girlfriend Sandra",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 2480,
  //               "naturalHeight": 3508
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/cherry1-desktop.jpg",
  //             "mobilePath": "uploads/mobile/cherry1-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/cherry1-thumbnail.jpg"
  //           },
  //           "cherry2.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [
  //                 "print material"
  //               ],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Cherry",
  //             "displayMain": null,
  //             "themes": [
  //               "fruit"
  //             ],
  //             "seeAlso": [
  //               "201911281605236_BGFC2LL5.jpg",
  //               "20170723_120614.jpg",
  //               "20170817_172102.jpg",
  //               "2019_superbig_00_see_the_bigger_picture_PC.jpg",
  //               "galaxy-watch-active2-hr-monitoring-sensor-effect.png",
  //               "im0035_explore_article-thumbnail_pc_1440x1060.jpg"
  //             ],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2018",
  //             "_id": "5df6cc83266b6a2cf4384b50",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "cg",
  //                   "print material"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/cherry2.jpg",
  //             "fileName": "cherry2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "A Christmas present I made for my brother Darius and his girlfriend Sandra",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 7020,
  //               "naturalHeight": 9930
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/cherry2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/cherry2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/cherry2-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "cherry1.jpg",
  //             "cherry2.jpg"
  //           ],
  //           "id": "Cherry-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Cherry-relatedArtworks"
  //         ]
  //       },
  //       "none": {
  //         "files": {
  //           "20170723_120614.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "studio",
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "wip",
  //                 "graphics"
  //               ],
  //               "listitems": [
  //                 "sketches",
  //                 "drawing"
  //               ],
  //               "themes": [
  //                 "eat",
  //                 "bones"
  //               ],
  //               "year": "2017",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "none",
  //             "displayMain": false,
  //             "themes": [
  //               "eat",
  //               "bones"
  //             ],
  //             "seeAlso": [
  //               "241.jpg"
  //             ],
  //             "location": "London, UK",
  //             "year": "2017",
  //             "_id": "5df2cb6140edab1940975b2d",
  //             "category": {
  //               "studio": {
  //                 "wip": [
  //                   "sketches"
  //                 ]
  //               },
  //               "medium": {
  //                 "graphics": [
  //                   "drawing"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/20170723_120614.jpg",
  //             "fileName": "20170723_120614.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": "Teeth",
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1393,
  //               "naturalHeight": 954
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/20170723_120614-desktop.jpg",
  //             "mobilePath": "uploads/mobile/20170723_120614-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/20170723_120614-thumbnail.jpg"
  //           },
  //           "trampled.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "graphics",
  //                 "painting"
  //               ],
  //               "listitems": [
  //                 "drawing"
  //               ],
  //               "themes": [
  //                 "metal",
  //                 "frame"
  //               ],
  //               "year": "2018",
  //               "location": "Panevėžys, Lithuania"
  //             },
  //             "artworkFamily": "none",
  //             "displayMain": true,
  //             "themes": [
  //               "metal",
  //               "frame"
  //             ],
  //             "seeAlso": [
  //               "malonioji_3.jpg",
  //               "north_1.jpg"
  //             ],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2018",
  //             "_id": "5df2d17640edab1940975b3b",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "drawing"
  //                 ],
  //                 "painting": []
  //               }
  //             },
  //             "filePath": "uploads/trampled.jpg",
  //             "fileName": "trampled.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": "Trampled by maggot ",
  //             "artworkDescription": "On a tip tray",
  //             "naturalSize": {
  //               "naturalWidth": 1092,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/trampled-desktop.jpg",
  //             "mobilePath": "uploads/mobile/trampled-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/trampled-thumbnail.jpg"
  //           },
  //           "kiss4.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "graphics"
  //               ],
  //               "listitems": [
  //                 "drawing",
  //                 "sketches"
  //               ],
  //               "themes": [
  //                 "connected spheres"
  //               ],
  //               "year": "2017",
  //               "location": "Woolwich, London, UK"
  //             },
  //             "artworkFamily": "none",
  //             "displayMain": true,
  //             "themes": [
  //               "connected spheres"
  //             ],
  //             "seeAlso": [
  //               "malonioji_1.jpg",
  //               "kiss-3.jpg",
  //               "kiss-0.jpg"
  //             ],
  //             "location": "Woolwich, London, UK",
  //             "year": "2017",
  //             "_id": "5df2d1a440edab1940975b3c",
  //             "category": {
  //               "studio": {
  //                 "wip": [
  //                   "sketches"
  //                 ]
  //               },
  //               "medium": {
  //                 "graphics": [
  //                   "drawing"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/kiss4.jpg",
  //             "fileName": "kiss4.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": "Kiss",
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 377,
  //               "naturalHeight": 566
  //             },
  //             "familyDisplayIndex": 2,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/kiss4-desktop.jpg",
  //             "mobilePath": "uploads/mobile/kiss4-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/kiss4-thumbnail.jpg"
  //           },
  //           "buddy.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "graphics"
  //               ],
  //               "listitems": [
  //                 "drawing"
  //               ],
  //               "themes": [],
  //               "year": "2014",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "none",
  //             "displayMain": false,
  //             "themes": [],
  //             "seeAlso": [
  //               "DSC_7228.jpg",
  //               "crescentBoxing.jpg"
  //             ],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5df2d1ff40edab1940975b3d",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "drawing"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/buddy.jpg",
  //             "fileName": "buddy.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": "Buddy",
  //             "artworkDescription": "I gave this to Anya, we worked together.",
  //             "naturalSize": {
  //               "naturalWidth": 843,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 3,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/buddy-desktop.jpg",
  //             "mobilePath": "uploads/mobile/buddy-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/buddy-thumbnail.jpg"
  //           },
  //           "crescentBoxing.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "graphics"
  //               ],
  //               "listitems": [
  //                 "drawing"
  //               ],
  //               "themes": [
  //                 "crescent",
  //                 "restaurant",
  //                 "celestial body"
  //               ],
  //               "year": "2015",
  //               "location": "Coldbath street, London, UK",
  //               "artworkDescription": []
  //             },
  //             "artworkFamily": "none",
  //             "displayMain": false,
  //             "themes": [
  //               "crescent",
  //               "restaurant",
  //               "celestial body"
  //             ],
  //             "seeAlso": [
  //               "marker-and-ballpoint.jpg",
  //               "buddy.jpg",
  //               "star_5.jpg"
  //             ],
  //             "location": "Coldbath street, London, UK",
  //             "year": "2015",
  //             "_id": "5df2d2e040edab1940975b3e",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "drawing"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/crescentBoxing.jpg",
  //             "fileName": "crescentBoxing.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": null,
  //             "artworkDescription": "I gave this to one of Lorenzos I know. Before he moved away he wanted to box with me. It was more exhausting than we expecting so in the end he asked me to just hit his head with my fist. \nRendered on a napkin from a restaurant we both worked at.",
  //             "naturalSize": {
  //               "naturalWidth": 1923,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 4,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/crescentBoxing-desktop.jpg",
  //             "mobilePath": "uploads/mobile/crescentBoxing-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/crescentBoxing-thumbnail.jpg"
  //           },
  //           "marker-and-ballpoint.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "studio",
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "misc",
  //                 "graphics"
  //               ],
  //               "listitems": [
  //                 "drawing"
  //               ],
  //               "themes": [],
  //               "year": "2012",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "none",
  //             "displayMain": false,
  //             "themes": [],
  //             "seeAlso": [
  //               "crescentBoxing.jpg",
  //               "emo-sky.jpg"
  //             ],
  //             "location": "London, UK",
  //             "year": "2012",
  //             "_id": "5df6cb11266b6a2cf4384b4c",
  //             "category": {
  //               "studio": {
  //                 "misc": []
  //               },
  //               "medium": {
  //                 "graphics": [
  //                   "drawing"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/marker-and-ballpoint.jpg",
  //             "fileName": "marker-and-ballpoint.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": null,
  //             "artworkDescription": "Two boards, ballpoint pent, highlighter, white paint (gesso?)",
  //             "naturalSize": {
  //               "naturalWidth": 718,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 5,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/marker-and-ballpoint-desktop.jpg",
  //             "mobilePath": "uploads/mobile/marker-and-ballpoint-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/marker-and-ballpoint-thumbnail.jpg"
  //           },
  //           "241.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "painting"
  //               ],
  //               "listitems": [],
  //               "themes": [
  //                 "bones"
  //               ],
  //               "year": "2015",
  //               "location": "Coldbath street, London, UK"
  //             },
  //             "artworkFamily": "none",
  //             "displayMain": false,
  //             "themes": [
  //               "bones"
  //             ],
  //             "seeAlso": [
  //               "20170723_120614.jpg",
  //               "emo-sky.jpg",
  //               "shitty-day.jpg"
  //             ],
  //             "location": "Coldbath street, London, UK",
  //             "year": "2015",
  //             "_id": "5df6d16c266b6a2cf4384b59",
  //             "category": {
  //               "medium": {
  //                 "painting": []
  //               }
  //             },
  //             "filePath": "uploads/241.jpg",
  //             "fileName": "241.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": null,
  //             "artworkDescription": "Two painting on one board. Oil pastel (blue), marker, brown oil paint. Found board. \n",
  //             "naturalSize": {
  //               "naturalWidth": 1411,
  //               "naturalHeight": 910
  //             },
  //             "familyDisplayIndex": 6,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/241-desktop.jpg",
  //             "mobilePath": "uploads/mobile/241-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/241-thumbnail.jpg"
  //           },
  //           "emo-sky.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "painting"
  //               ],
  //               "listitems": [],
  //               "themes": [
  //                 "weather",
  //                 "cloud",
  //                 "bones"
  //               ],
  //               "year": "2015",
  //               "location": "Coldbath street, London, UK"
  //             },
  //             "artworkFamily": "none",
  //             "displayMain": false,
  //             "themes": [
  //               "weather",
  //               "cloud",
  //               "bones"
  //             ],
  //             "seeAlso": [
  //               "241.jpg",
  //               "shitty-day.jpg",
  //               "marker-and-ballpoint.jpg"
  //             ],
  //             "location": "Coldbath street, London, UK",
  //             "year": "2015",
  //             "_id": "5df6d32b266b6a2cf4384b5d",
  //             "category": {
  //               "medium": {
  //                 "painting": []
  //               }
  //             },
  //             "filePath": "uploads/emo-sky.jpg",
  //             "fileName": "emo-sky.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": null,
  //             "artworkDescription": "Skull print fabric stretched over found board, white pigment or plaster powder, blue oil pastel",
  //             "naturalSize": {
  //               "naturalWidth": 910,
  //               "naturalHeight": 572
  //             },
  //             "familyDisplayIndex": 7,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/emo-sky-desktop.jpg",
  //             "mobilePath": "uploads/mobile/emo-sky-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/emo-sky-thumbnail.jpg"
  //           },
  //           "hunter-half-life-2-episode-3.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "painting"
  //               ],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "2015",
  //               "location": "Coldbath street, London, UK"
  //             },
  //             "artworkFamily": "none",
  //             "displayMain": false,
  //             "themes": [],
  //             "seeAlso": [
  //               "malonioji_1.jpg",
  //               "malonioji_3.jpg"
  //             ],
  //             "location": "Coldbath street, London, UK",
  //             "year": "2015",
  //             "_id": "5df6d42d266b6a2cf4384b5e",
  //             "category": {
  //               "medium": {
  //                 "painting": []
  //               }
  //             },
  //             "filePath": "uploads/hunter-half-life-2-episode-3.jpg",
  //             "fileName": "hunter-half-life-2-episode-3.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": "Hunter (Half-life 2: Episode 3)",
  //             "artworkDescription": "Painted on a found, oval shaped board that had fabric stretched over it already, perhaps a table top. Based on an exceptionally sexual  enemy design from Half-life 2: Episode 3.",
  //             "naturalSize": {
  //               "naturalWidth": 643,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 8,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/hunter-half-life-2-episode-3-desktop.jpg",
  //             "mobilePath": "uploads/mobile/hunter-half-life-2-episode-3-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/hunter-half-life-2-episode-3-thumbnail.jpg"
  //           },
  //           "person-on-bridge.png": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [
  //                 "misc"
  //               ],
  //               "listitems": [
  //                 "sketches"
  //               ],
  //               "themes": [
  //                 "oil pastel",
  //                 "weather"
  //               ],
  //               "year": "2011",
  //               "location": "Panevėžys, Lithuania"
  //             },
  //             "artworkFamily": "none",
  //             "displayMain": null,
  //             "themes": [
  //               "social",
  //               "Time",
  //               "oil pastel",
  //               "weather"
  //             ],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2011",
  //             "_id": "5df6d5a9266b6a2cf4384b60",
  //             "category": {
  //               "studio": {
  //                 "wip": [
  //                   "sketches"
  //                 ],
  //                 "misc": []
  //               }
  //             },
  //             "filePath": "uploads/person-on-bridge.png",
  //             "fileName": "person-on-bridge.png",
  //             "fileType": "image/png",
  //             "familyDescription": null,
  //             "artworkTitle": "Person on bridge",
  //             "artworkDescription": "Person on bridge, maybe fishing or just looking at the fog.",
  //             "naturalSize": {
  //               "naturalWidth": 652,
  //               "naturalHeight": 760
  //             },
  //             "familyDisplayIndex": 9,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/person-on-bridge-desktop.png",
  //             "mobilePath": "uploads/mobile/person-on-bridge-mob.png",
  //             "thumbnailPath": "uploads/thumbnails/person-on-bridge-thumbnail.png"
  //           },
  //           "shitty-day.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "painting"
  //               ],
  //               "listitems": [],
  //               "themes": [
  //                 "weather",
  //                 "cloud",
  //                 "days",
  //                 "celestial body"
  //               ],
  //               "year": "2015",
  //               "location": "Coldbath street, London, UK"
  //             },
  //             "artworkFamily": "none",
  //             "displayMain": true,
  //             "themes": [
  //               "weather",
  //               "cloud",
  //               "days",
  //               "celestial body"
  //             ],
  //             "seeAlso": [
  //               "241.jpg",
  //               "emo-sky.jpg"
  //             ],
  //             "location": "Coldbath street, London, UK",
  //             "year": "2015",
  //             "_id": "5df6d705266b6a2cf4384b63",
  //             "category": {
  //               "medium": {
  //                 "painting": []
  //               }
  //             },
  //             "filePath": "uploads/shitty-day.jpg",
  //             "fileName": "shitty-day.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": "Šūdina diena",
  //             "artworkDescription": "Brown clouds in brown sky, floating away or hanging heavily in place. When the paint was still wet, I layed some sort of street sign on this board so I could have two of the same painting. ",
  //             "naturalSize": {
  //               "naturalWidth": 1072,
  //               "naturalHeight": 882
  //             },
  //             "familyDisplayIndex": 10,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/shitty-day-desktop.jpg",
  //             "mobilePath": "uploads/mobile/shitty-day-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/shitty-day-thumbnail.jpg"
  //           },
  //           "strawberry-forcefield.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "painting"
  //               ],
  //               "listitems": [],
  //               "themes": [
  //                 "fruit",
  //                 "social"
  //               ],
  //               "year": "2018",
  //               "location": "Panevėžys, Lithuania"
  //             },
  //             "artworkFamily": "none",
  //             "displayMain": true,
  //             "themes": [
  //               "fruit",
  //               "social"
  //             ],
  //             "seeAlso": [
  //               "apple-pig-close-up.jpg"
  //             ],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2018",
  //             "_id": "5df6d79d266b6a2cf4384b64",
  //             "category": {
  //               "medium": {
  //                 "painting": []
  //               }
  //             },
  //             "filePath": "uploads/strawberry-forcefield.jpg",
  //             "fileName": "strawberry-forcefield.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": "Strawberry forcefield",
  //             "artworkDescription": "Water based paint (gouache or acrylics) and oil or soft pastel on paper.",
  //             "naturalSize": {
  //               "naturalWidth": 1543,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 11,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/strawberry-forcefield-desktop.jpg",
  //             "mobilePath": "uploads/mobile/strawberry-forcefield-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/strawberry-forcefield-thumbnail.jpg"
  //           },
  //           "wizard-and-his-scholar.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "painting"
  //               ],
  //               "listitems": [],
  //               "themes": [
  //                 "social",
  //                 "connected spheres",
  //                 "crescent"
  //               ],
  //               "year": "2015",
  //               "location": "Coldbath street, London, UK"
  //             },
  //             "artworkFamily": "none",
  //             "displayMain": false,
  //             "themes": [
  //               "social",
  //               "connected spheres",
  //               "crescent"
  //             ],
  //             "seeAlso": [
  //               "crescentBoxing.jpg"
  //             ],
  //             "location": "Coldbath street, London, UK",
  //             "year": "2015",
  //             "_id": "5df6d83b266b6a2cf4384b65",
  //             "category": {
  //               "medium": {
  //                 "painting": []
  //               }
  //             },
  //             "filePath": "uploads/wizard-and-his-scholar.jpg",
  //             "fileName": "wizard-and-his-scholar.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": "Wizard and his scholar",
  //             "artworkDescription": "Found board, utility paint (white), markers, blue oil paint or oil pastel. ",
  //             "naturalSize": {
  //               "naturalWidth": 956,
  //               "naturalHeight": 677
  //             },
  //             "familyDisplayIndex": 12,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/wizard-and-his-scholar-desktop.jpg",
  //             "mobilePath": "uploads/mobile/wizard-and-his-scholar-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/wizard-and-his-scholar-thumbnail.jpg"
  //           },
  //           "char-creation-1.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "studio"
  //               ],
  //               "subcategory": [
  //                 "studio"
  //               ],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "2019",
  //               "location": "Panevėžys, Lithuania"
  //             },
  //             "artworkFamily": "none",
  //             "displayMain": null,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2019",
  //             "_id": "5e0a123a9ed2212d5071768c",
  //             "category": {
  //               "studio": {
  //                 "studio": [],
  //                 "wip": [
  //                   "sketches"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/char-creation-1.jpg",
  //             "fileName": "char-creation-1.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": "Char creation",
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1080,
  //               "naturalHeight": 525
  //             },
  //             "familyDisplayIndex": 13,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/char-creation-1-desktop.jpg",
  //             "mobilePath": "uploads/mobile/char-creation-1-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/char-creation-1-thumbnail.jpg"
  //           },
  //           "char-creation-2.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [
  //                 "sketches"
  //               ],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "none",
  //             "displayMain": false,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2019",
  //             "_id": "5e0a123a9ed2212d5071768d",
  //             "category": {
  //               "studio": {
  //                 "wip": [
  //                   "sketches"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/char-creation-2.jpg",
  //             "fileName": "char-creation-2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": "Char creation",
  //             "artworkDescription": "Depicts a character creation window commonly seen in role-playing video games.",
  //             "naturalSize": {
  //               "naturalWidth": 1080,
  //               "naturalHeight": 772
  //             },
  //             "familyDisplayIndex": 14,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/char-creation-2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/char-creation-2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/char-creation-2-thumbnail.jpg"
  //           },
  //           "20191106_075914.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "studio"
  //               ],
  //               "subcategory": [
  //                 "misc"
  //               ],
  //               "listitems": [],
  //               "themes": [
  //                 "oil pastel",
  //                 "furniture"
  //               ],
  //               "year": "2019",
  //               "location": "Warsaw, Poland"
  //             },
  //             "artworkFamily": "none",
  //             "displayMain": true,
  //             "themes": [
  //               "oil pastel",
  //               "furniture"
  //             ],
  //             "seeAlso": [],
  //             "location": "Warsaw, Poland",
  //             "year": "2019",
  //             "_id": "5e0a12b89ed2212d5071768e",
  //             "category": {
  //               "studio": {
  //                 "misc": []
  //               }
  //             },
  //             "filePath": "uploads/20191106_075914.jpg",
  //             "fileName": "20191106_075914.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": "Bed",
  //             "artworkDescription": "Oil pastel in notebook.",
  //             "naturalSize": {
  //               "naturalWidth": 2536,
  //               "naturalHeight": 1960
  //             },
  //             "familyDisplayIndex": 15,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/20191106_075914-desktop.jpg",
  //             "mobilePath": "uploads/mobile/20191106_075914-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/20191106_075914-thumbnail.jpg"
  //           },
  //           "buried-in-meat-2.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "studio"
  //               ],
  //               "subcategory": [
  //                 "misc"
  //               ],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "2018",
  //               "location": "Panevėžys, Lithuania"
  //             },
  //             "artworkFamily": "none",
  //             "displayMain": false,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2018",
  //             "_id": "5e0a17a59ed2212d50717698",
  //             "category": {
  //               "studio": {
  //                 "misc": []
  //               }
  //             },
  //             "filePath": "uploads/buried-in-meat-2.jpg",
  //             "fileName": "buried-in-meat-2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 415,
  //               "naturalHeight": 738
  //             },
  //             "familyDisplayIndex": 16,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/buried-in-meat-2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/buried-in-meat-2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/buried-in-meat-2-thumbnail.jpg"
  //           },
  //           "woodblock-5.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "studio"
  //               ],
  //               "subcategory": [
  //                 "misc"
  //               ],
  //               "listitems": [],
  //               "themes": [],
  //               "year": null,
  //               "location": null
  //             },
  //             "artworkFamily": "none",
  //             "displayMain": null,
  //             "themes": [],
  //             "seeAlso": [
  //               "woodblock-2.jpg"
  //             ],
  //             "location": null,
  //             "year": null,
  //             "_id": "5e0a601d7d57c70eb872ee92",
  //             "category": {
  //               "studio": {
  //                 "misc": []
  //               }
  //             },
  //             "filePath": "uploads/woodblock-5.jpg",
  //             "fileName": "woodblock-5.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1467,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 17,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/woodblock-5-desktop.jpg",
  //             "mobilePath": "uploads/mobile/woodblock-5-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/woodblock-5-thumbnail.jpg"
  //           },
  //           "kiss-3.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "studio"
  //               ],
  //               "subcategory": [
  //                 "misc",
  //                 "studio"
  //               ],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "2017",
  //               "location": "Woolwich, London, UK"
  //             },
  //             "artworkFamily": "none",
  //             "displayMain": null,
  //             "themes": [],
  //             "seeAlso": [
  //               "kiss4.jpg"
  //             ],
  //             "location": "Woolwich, London, UK",
  //             "year": "2017",
  //             "_id": "5e0a67317d57c70eb872ee9a",
  //             "category": {
  //               "studio": {
  //                 "misc": [],
  //                 "studio": []
  //               }
  //             },
  //             "filePath": "uploads/kiss-3.jpg",
  //             "fileName": "kiss-3.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1920,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 18,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/kiss-3-desktop.jpg",
  //             "mobilePath": "uploads/mobile/kiss-3-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/kiss-3-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "20170723_120614.jpg",
  //             "trampled.jpg",
  //             "kiss4.jpg",
  //             "buddy.jpg",
  //             "crescentBoxing.jpg",
  //             "marker-and-ballpoint.jpg",
  //             "241.jpg",
  //             "emo-sky.jpg",
  //             "hunter-half-life-2-episode-3.jpg",
  //             "person-on-bridge.png",
  //             "shitty-day.jpg",
  //             "strawberry-forcefield.jpg",
  //             "wizard-and-his-scholar.jpg",
  //             "char-creation-1.jpg",
  //             "char-creation-2.jpg",
  //             "20191106_075914.jpg",
  //             "buried-in-meat-2.jpg",
  //             "woodblock-5.jpg",
  //             "kiss-3.jpg"
  //           ],
  //           "id": "none-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "none-relatedArtworks"
  //         ]
  //       },
  //       "Apple pig": {
  //         "files": {
  //           "DSC_7228.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "painting"
  //               ],
  //               "listitems": [],
  //               "themes": [
  //                 "fruit"
  //               ],
  //               "year": "2017",
  //               "location": "Woolwich, London, UK"
  //             },
  //             "artworkFamily": "Apple pig",
  //             "displayMain": false,
  //             "themes": [
  //               "fruit"
  //             ],
  //             "seeAlso": [
  //               "cherry1.jpg"
  //             ],
  //             "location": "Woolwich, London, UK",
  //             "year": "2017",
  //             "_id": "5dea6179b6cb823fccea64f8",
  //             "category": {
  //               "medium": {
  //                 "painting": []
  //               }
  //             },
  //             "filePath": "uploads/DSC_7228.jpg",
  //             "fileName": "DSC_7228.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 717,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/DSC_7228-desktop.jpg",
  //             "mobilePath": "uploads/mobile/DSC_7228-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/DSC_7228-thumbnail.jpg"
  //           },
  //           "apple-pig-close-up.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "painting"
  //               ],
  //               "listitems": [],
  //               "themes": [
  //                 "fruit"
  //               ],
  //               "year": "2017",
  //               "location": "Woolwich, London, UK"
  //             },
  //             "artworkFamily": "Apple pig",
  //             "displayMain": false,
  //             "themes": [
  //               "fruit"
  //             ],
  //             "seeAlso": [
  //               "cherry1.jpg",
  //               "mushroom-strawberry.jpg",
  //               "strawberry-forcefield.jpg",
  //               "trampled.jpg"
  //             ],
  //             "location": "Woolwich, London, UK",
  //             "year": "2017",
  //             "_id": "5df6d18e266b6a2cf4384b5a",
  //             "category": {
  //               "medium": {
  //                 "painting": []
  //               }
  //             },
  //             "filePath": "uploads/apple-pig-close-up.jpg",
  //             "fileName": "apple-pig-close-up.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 364,
  //               "naturalHeight": 456
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/apple-pig-close-up-desktop.jpg",
  //             "mobilePath": "uploads/mobile/apple-pig-close-up-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/apple-pig-close-up-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "apple-pig-close-up.jpg",
  //             "DSC_7228.jpg"
  //           ],
  //           "id": "Apple pig-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Apple pig-relatedArtworks"
  //         ]
  //       },
  //       "about": {
  //         "files": {
  //           "portrait.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "studio"
  //               ],
  //               "subcategory": [
  //                 "studio"
  //               ],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "2018",
  //               "location": "Panevėžys, Lithuania"
  //             },
  //             "artworkFamily": "about",
  //             "displayMain": null,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2018",
  //             "_id": "5df2a441f2a6d424d81f3963",
  //             "category": {
  //               "studio": {
  //                 "studio": []
  //               }
  //             },
  //             "filePath": "uploads/portrait.jpg",
  //             "fileName": "portrait.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": null,
  //             "artworkDescription": "Andrius Svilys b. 1992, Panevėžys, Lithuania. Currently lives in Warsaw, Poland. ",
  //             "naturalSize": {
  //               "naturalWidth": 3024,
  //               "naturalHeight": 5376
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/portrait-desktop.jpg",
  //             "mobilePath": "uploads/mobile/portrait-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/portrait-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "portrait.jpg"
  //           ],
  //           "id": "about-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "about-relatedArtworks"
  //         ]
  //       },
  //       "Chips and ash on snow": {
  //         "files": {
  //           "chips3.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [
  //                 "sketches"
  //               ],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Chips and ash on snow",
  //             "displayMain": false,
  //             "themes": [
  //               "eat",
  //               "social",
  //               "weather"
  //             ],
  //             "seeAlso": [
  //               "20170723_120614.jpg"
  //             ],
  //             "location": "London, UK",
  //             "year": "2012",
  //             "_id": "5df6cb96266b6a2cf4384b4e",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "drawing"
  //                 ]
  //               },
  //               "studio": {
  //                 "wip": [
  //                   "sketches"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/chips3.jpg",
  //             "fileName": "chips3.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 2900,
  //               "naturalHeight": 1836
  //             },
  //             "familyDisplayIndex": 2,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/chips3-desktop.jpg",
  //             "mobilePath": "uploads/mobile/chips3-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/chips3-thumbnail.jpg"
  //           },
  //           "ash-and-chip.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [
  //                 "painting"
  //               ],
  //               "listitems": [],
  //               "themes": [
  //                 "social",
  //                 "weather",
  //                 "furniture"
  //               ],
  //               "year": "2012",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "Chips and ash on snow",
  //             "displayMain": false,
  //             "themes": [
  //               "eat",
  //               "social",
  //               "weather",
  //               "furniture"
  //             ],
  //             "seeAlso": [
  //               "20170723_120614.jpg",
  //               "before-eyes.jpg"
  //             ],
  //             "location": "London, UK",
  //             "year": "2012",
  //             "_id": "5df6d20c266b6a2cf4384b5b",
  //             "category": {
  //               "medium": {
  //                 "painting": []
  //               }
  //             },
  //             "filePath": "uploads/ash-and-chip.jpg",
  //             "fileName": "ash-and-chip.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": null,
  //             "artworkDescription": "Furniture door, wax, various paint.",
  //             "naturalSize": {
  //               "naturalWidth": 1259,
  //               "naturalHeight": 990
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/ash-and-chip-desktop.jpg",
  //             "mobilePath": "uploads/mobile/ash-and-chip-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/ash-and-chip-thumbnail.jpg"
  //           },
  //           "chips-and-ash-on-snow.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "studio"
  //               ],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Chips and ash on snow",
  //             "displayMain": null,
  //             "themes": [
  //               "social",
  //               "weather"
  //             ],
  //             "seeAlso": [
  //               "20170723_120614.jpg"
  //             ],
  //             "location": "London, UK",
  //             "year": "2012",
  //             "_id": "5dfdf8fde7c9572b24e752a5",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "drawing"
  //                 ]
  //               },
  //               "studio": {
  //                 "wip": [
  //                   "sketches"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/chips-and-ash-on-snow.jpg",
  //             "fileName": "chips-and-ash-on-snow.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1440,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/chips-and-ash-on-snow-desktop.jpg",
  //             "mobilePath": "uploads/mobile/chips-and-ash-on-snow-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/chips-and-ash-on-snow-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "ash-and-chip.jpg",
  //             "chips-and-ash-on-snow.jpg",
  //             "chips3.jpg"
  //           ],
  //           "id": "Chips and ash on snow-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Chips and ash on snow-relatedArtworks"
  //         ]
  //       },
  //       "Connected spheres": {
  //         "files": {
  //           "connectedSpheres1.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": null,
  //               "location": null
  //             },
  //             "artworkFamily": "Connected spheres",
  //             "displayMain": null,
  //             "themes": [
  //               "connected spheres"
  //             ],
  //             "seeAlso": [],
  //             "location": null,
  //             "year": null,
  //             "_id": "5df6c8e3266b6a2cf4384b45",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "drawing"
  //                 ]
  //               },
  //               "studio": {
  //                 "wip": [
  //                   "sketches",
  //                   "progress"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/connectedSpheres1.jpg",
  //             "fileName": "connectedSpheres1.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1746,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/connectedSpheres1-desktop.jpg",
  //             "mobilePath": "uploads/mobile/connectedSpheres1-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/connectedSpheres1-thumbnail.jpg"
  //           },
  //           "connectedSpheres2.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium",
  //                 "studio"
  //               ],
  //               "subcategory": [
  //                 "graphics",
  //                 "wip"
  //               ],
  //               "listitems": [
  //                 "drawing",
  //                 "sketches"
  //               ],
  //               "themes": [
  //                 "connected spheres"
  //               ],
  //               "year": "2017",
  //               "location": "Woolwich, London, UK"
  //             },
  //             "artworkFamily": "Connected spheres",
  //             "displayMain": true,
  //             "themes": [
  //               "connected spheres"
  //             ],
  //             "seeAlso": [
  //               "stage_kieme_1.jpg",
  //               "malonioji_1.jpg",
  //               "kiss-0.jpg"
  //             ],
  //             "location": "Woolwich, London, UK",
  //             "year": "2017",
  //             "_id": "5df6c8e3266b6a2cf4384b46",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "drawing"
  //                 ]
  //               },
  //               "studio": {
  //                 "wip": [
  //                   "sketches"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/connectedSpheres2.jpg",
  //             "fileName": "connectedSpheres2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1424,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/connectedSpheres2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/connectedSpheres2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/connectedSpheres2-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "connectedSpheres2.jpg",
  //             "connectedSpheres1.jpg"
  //           ],
  //           "id": "Connected spheres-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Connected spheres-relatedArtworks"
  //         ]
  //       },
  //       "Days": {
  //         "files": {
  //           "days2.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "sculpture"
  //               ],
  //               "listitems": [],
  //               "themes": [
  //                 "days",
  //                 "metal"
  //               ],
  //               "year": "2015",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "Days",
  //             "displayMain": true,
  //             "themes": [
  //               "days",
  //               "metal"
  //             ],
  //             "seeAlso": [
  //               "WP_20150806_004.jpg",
  //               "WP_20150806_007.jpg"
  //             ],
  //             "location": "London, UK",
  //             "year": "2015",
  //             "_id": "5df6cfe7266b6a2cf4384b58",
  //             "category": {
  //               "medium": {
  //                 "sculpture": []
  //               }
  //             },
  //             "filePath": "uploads/days2.jpg",
  //             "fileName": "days2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 607,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/days2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/days2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/days2-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "days2.jpg"
  //           ],
  //           "id": "Days-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Days-relatedArtworks"
  //         ]
  //       },
  //       "acephale_gradient": {
  //         "files": {
  //           "gradient2.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "acephale_gradient",
  //             "displayMain": null,
  //             "themes": [
  //               "acephale"
  //             ],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2016",
  //             "_id": "5df2cdf840edab1940975b32",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "drawing"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/gradient2.jpg",
  //             "fileName": "gradient2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 785,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/gradient2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/gradient2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/gradient2-thumbnail.jpg"
  //           },
  //           "gradient7.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "studio"
  //               ],
  //               "subcategory": [
  //                 "wip"
  //               ],
  //               "listitems": [
  //                 "sketches"
  //               ],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "acephale_gradient",
  //             "displayMain": null,
  //             "themes": [
  //               "acephale"
  //             ],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2016",
  //             "_id": "5df2cdf840edab1940975b34",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "drawing"
  //                 ]
  //               },
  //               "studio": {
  //                 "wip": [
  //                   "sketches"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/gradient7.jpg",
  //             "fileName": "gradient7.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 810,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 2,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/gradient7-desktop.jpg",
  //             "mobilePath": "uploads/mobile/gradient7-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/gradient7-thumbnail.jpg"
  //           },
  //           "gradient0.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "graphics"
  //               ],
  //               "listitems": [
  //                 "drawing"
  //               ],
  //               "themes": [
  //                 "acephale"
  //               ],
  //               "year": "2016",
  //               "location": "Panevėžys, Lithuania"
  //             },
  //             "artworkFamily": "acephale_gradient",
  //             "displayMain": true,
  //             "themes": [
  //               "acephale"
  //             ],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2016",
  //             "_id": "5df2cdf840edab1940975b38",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "drawing"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/gradient0.jpg",
  //             "fileName": "gradient0.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 764,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/gradient0-desktop.jpg",
  //             "mobilePath": "uploads/mobile/gradient0-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/gradient0-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "gradient0.jpg",
  //             "gradient2.jpg",
  //             "gradient7.jpg"
  //           ],
  //           "id": "acephale_gradient-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "acephale_gradient-relatedArtworks"
  //         ]
  //       },
  //       "Bench": {
  //         "files": {
  //           "bench1.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Bench",
  //             "displayMain": null,
  //             "themes": [
  //               "furniture",
  //               "social"
  //             ],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2018",
  //             "_id": "5df6cef8266b6a2cf4384b52",
  //             "category": {
  //               "public": {
  //                 "other": []
  //               },
  //               "medium": {
  //                 "sculpture": []
  //               }
  //             },
  //             "filePath": "uploads/bench1.jpg",
  //             "fileName": "bench1.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "In 2018 I attended a professional training programme. The atmosphere felt oppressive. I made this bench, brought it over to school and chained it around a column. It has two modes: bench and ashtray (made from groin protector). The building security (male) approached me as soon as I entered the building and asked if I had permission chain down the bench. I, aggro-defensively, lied that I had. Later I had to speak to the director of the school (female), to whom I presented the bench as a public benefit and so the bench stayed. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 642,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/bench1-desktop.jpg",
  //             "mobilePath": "uploads/mobile/bench1-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/bench1-thumbnail.jpg"
  //           },
  //           "bench2.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Bench",
  //             "displayMain": false,
  //             "themes": [
  //               "furniture",
  //               "social"
  //             ],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2018",
  //             "_id": "5df6cef8266b6a2cf4384b53",
  //             "category": {
  //               "public": {
  //                 "other": []
  //               },
  //               "medium": {
  //                 "sculpture": []
  //               }
  //             },
  //             "filePath": "uploads/bench2.jpg",
  //             "fileName": "bench2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "In 2018 I attended a professional training programme. The atmosphere felt oppressive. I made this bench, brought it over to school and chained it around a column. It has two modes: bench and ashtray (made from groin protector). The building security (male) approached me as soon as I entered the building and asked if I had permission chain down the bench. I, aggro-defensively, lied that I had. Later I had to speak to the director of the school (female), to whom I presented the bench as a public benefit and so the bench stayed. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 679,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/bench2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/bench2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/bench2-thumbnail.jpg"
  //           },
  //           "bench-public-2.png": {
  //             "displayTriggers": {
  //               "category": [
  //                 "public",
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "sculpture",
  //                 "other"
  //               ],
  //               "listitems": [],
  //               "themes": [
  //                 "furniture",
  //                 "social"
  //               ],
  //               "year": "2018",
  //               "location": "Panevėžys, Lithuania"
  //             },
  //             "artworkFamily": "Bench",
  //             "displayMain": true,
  //             "themes": [
  //               "furniture",
  //               "social"
  //             ],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2018",
  //             "_id": "5df6cef8266b6a2cf4384b55",
  //             "category": {
  //               "public": {
  //                 "other": []
  //               },
  //               "medium": {
  //                 "sculpture": []
  //               }
  //             },
  //             "filePath": "uploads/bench-public-2.png",
  //             "fileName": "bench-public-2.png",
  //             "fileType": "image/png",
  //             "familyDescription": "In 2018 I attended a professional training programme. The atmosphere felt oppressive. I made this bench, brought it over to school and chained it around a column. It has two modes: bench and ashtray (made from groin protector). The building security (male) approached me as soon as I entered the building and asked if I had permission chain down the bench. I, aggro-defensively, lied that I had. Later I had to speak to the director of the school (female), to whom I presented the bench as a public benefit and so the bench stayed. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 990,
  //               "naturalHeight": 562
  //             },
  //             "familyDisplayIndex": 2,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/bench-public-2-desktop.png",
  //             "mobilePath": "uploads/mobile/bench-public-2-mob.png",
  //             "thumbnailPath": "uploads/thumbnails/bench-public-2-thumbnail.png"
  //           },
  //           "bench-public-1.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Bench",
  //             "displayMain": false,
  //             "themes": [
  //               "furniture",
  //               "social"
  //             ],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2018",
  //             "_id": "5df6cef8266b6a2cf4384b54",
  //             "category": {
  //               "public": {
  //                 "other": []
  //               },
  //               "medium": {
  //                 "sculpture": []
  //               }
  //             },
  //             "filePath": "uploads/bench-public-1.jpg",
  //             "fileName": "bench-public-1.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "In 2018 I attended a professional training programme. The atmosphere felt oppressive. I made this bench, brought it over to school and chained it around a column. It has two modes: bench and ashtray (made from groin protector). The building security (male) approached me as soon as I entered the building and asked if I had permission chain down the bench. I, aggro-defensively, lied that I had. Later I had to speak to the director of the school (female), to whom I presented the bench as a public benefit and so the bench stayed. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 498,
  //               "naturalHeight": 872
  //             },
  //             "familyDisplayIndex": 3,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/bench-public-1-desktop.jpg",
  //             "mobilePath": "uploads/mobile/bench-public-1-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/bench-public-1-thumbnail.jpg"
  //           },
  //           "bench-3.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Bench",
  //             "displayMain": null,
  //             "themes": [
  //               "furniture",
  //               "social"
  //             ],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2018",
  //             "_id": "5df6cef8266b6a2cf4384b56",
  //             "category": {
  //               "public": {
  //                 "other": []
  //               },
  //               "medium": {
  //                 "sculpture": []
  //               }
  //             },
  //             "filePath": "uploads/bench-3.jpg",
  //             "fileName": "bench-3.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "In 2018 I attended a professional training programme. The atmosphere felt oppressive. I made this bench, brought it over to school and chained it around a column. It has two modes: bench and ashtray (made from groin protector). The building security (male) approached me as soon as I entered the building and asked if I had permission chain down the bench. I, aggro-defensively, lied that I had. Later I had to speak to the director of the school (female), to whom I presented the bench as a public benefit and so the bench stayed. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 608,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 4,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/bench-3-desktop.jpg",
  //             "mobilePath": "uploads/mobile/bench-3-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/bench-3-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "bench2.jpg",
  //             "bench1.jpg",
  //             "bench-public-2.png",
  //             "bench-public-1.jpg",
  //             "bench-3.jpg"
  //           ],
  //           "id": "Bench-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Bench-relatedArtworks"
  //         ]
  //       },
  //       "Hammer screw": {
  //         "files": {
  //           "hammerScrew.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium",
  //                 "studio"
  //               ],
  //               "subcategory": [
  //                 "graphics",
  //                 "wip"
  //               ],
  //               "listitems": [
  //                 "drawing",
  //                 "sketches"
  //               ],
  //               "themes": [
  //                 "acephale",
  //                 "tools"
  //               ],
  //               "year": "2018",
  //               "location": "Panevėžys, Lithuania"
  //             },
  //             "artworkFamily": "Hammer screw",
  //             "displayMain": true,
  //             "themes": [
  //               "acephale",
  //               "tools"
  //             ],
  //             "seeAlso": [
  //               "gradient0.jpg"
  //             ],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2018",
  //             "_id": "5df2d0b040edab1940975b3a",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "drawing"
  //                 ]
  //               },
  //               "studio": {
  //                 "wip": [
  //                   "sketches"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/hammerScrew.jpg",
  //             "fileName": "hammerScrew.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": null,
  //             "artworkDescription": "Hammer screw",
  //             "naturalSize": {
  //               "naturalWidth": 767,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/hammerScrew-desktop.jpg",
  //             "mobilePath": "uploads/mobile/hammerScrew-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/hammerScrew-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "hammerScrew.jpg"
  //           ],
  //           "id": "Hammer screw-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Hammer screw-relatedArtworks"
  //         ]
  //       },
  //       "Garden scene": {
  //         "files": {
  //           "detail_testciles_2.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [
  //                 "fruit"
  //               ],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Garden scene",
  //             "displayMain": false,
  //             "themes": [
  //               "fountain",
  //               "fruit"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2013",
  //             "_id": "5dfa68ebde6a352340297e1f",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "installation"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/detail_testciles_2.jpg",
  //             "fileName": "detail_testciles_2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 860,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/detail_testciles_2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/detail_testciles_2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/detail_testciles_2-thumbnail.jpg"
  //           },
  //           "assemblage_4.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "sculpture"
  //               ],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "2013",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "Garden scene",
  //             "displayMain": null,
  //             "themes": [
  //               "fountain",
  //               "fruit"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2013",
  //             "_id": "5dfa68f9de6a352340297e22",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "installation"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/assemblage_4.jpg",
  //             "fileName": "assemblage_4.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 799,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 2,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/assemblage_4-desktop.jpg",
  //             "mobilePath": "uploads/mobile/assemblage_4-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/assemblage_4-thumbnail.jpg"
  //           },
  //           "assemblage_2.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Garden scene",
  //             "displayMain": null,
  //             "themes": [
  //               "fountain",
  //               "fruit"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2013",
  //             "_id": "5dfa68fede6a352340297e23",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "installation"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/assemblage_2.jpg",
  //             "fileName": "assemblage_2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 782,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/assemblage_2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/assemblage_2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/assemblage_2-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "detail_testciles_2.jpg",
  //             "assemblage_2.jpg",
  //             "assemblage_4.jpg"
  //           ],
  //           "id": "Garden scene-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Garden scene-relatedArtworks"
  //         ]
  //       },
  //       "Red frame": {
  //         "files": {
  //           "red-frame.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium",
  //                 "studio"
  //               ],
  //               "subcategory": [
  //                 "painting",
  //                 "wip"
  //               ],
  //               "listitems": [],
  //               "themes": [
  //                 "frame"
  //               ],
  //               "year": "2017",
  //               "location": "Woolwich, London, UK"
  //             },
  //             "artworkFamily": "Red frame",
  //             "displayMain": true,
  //             "themes": [
  //               "frame"
  //             ],
  //             "seeAlso": [
  //               "velniai_2.jpg",
  //               "north_1.jpg"
  //             ],
  //             "location": "Woolwich, London, UK",
  //             "year": "2017",
  //             "_id": "5df6d605266b6a2cf4384b62",
  //             "category": {
  //               "medium": {
  //                 "painting": []
  //               },
  //               "studio": {
  //                 "wip": []
  //               }
  //             },
  //             "filePath": "uploads/red-frame.jpg",
  //             "fileName": "red-frame.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": "",
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 608,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/red-frame-desktop.jpg",
  //             "mobilePath": "uploads/mobile/red-frame-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/red-frame-thumbnail.jpg"
  //           },
  //           "20170424_224934.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "painting"
  //               ],
  //               "listitems": [],
  //               "themes": [],
  //               "year": null,
  //               "location": null
  //             },
  //             "artworkFamily": "Red frame",
  //             "displayMain": null,
  //             "themes": [],
  //             "seeAlso": [
  //               "malonioji_3.jpg"
  //             ],
  //             "location": null,
  //             "year": null,
  //             "_id": "5dfdfe47e7c9572b24e752a6",
  //             "category": {
  //               "medium": {
  //                 "painting": []
  //               }
  //             },
  //             "filePath": "uploads/20170424_224934.jpg",
  //             "fileName": "20170424_224934.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1229,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/20170424_224934-desktop.jpg",
  //             "mobilePath": "uploads/mobile/20170424_224934-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/20170424_224934-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "red-frame.jpg",
  //             "20170424_224934.jpg"
  //           ],
  //           "id": "Red frame-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Red frame-relatedArtworks"
  //         ]
  //       },
  //       "Chicken leg": {
  //         "files": {
  //           "chicken_leg_1.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "studio"
  //               ],
  //               "subcategory": [
  //                 "studio"
  //               ],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Chicken leg",
  //             "displayMain": null,
  //             "themes": [
  //               "metal",
  //               "support"
  //             ],
  //             "seeAlso": [],
  //             "location": "",
  //             "year": "2013",
  //             "_id": "5dfa67aede6a352340297e18",
  //             "category": {
  //               "medium": {
  //                 "sculpture": []
  //               },
  //               "studio": {
  //                 "studio": []
  //               }
  //             },
  //             "filePath": "uploads/chicken_leg_1.jpg",
  //             "fileName": "chicken_leg_1.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 721,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/chicken_leg_1-desktop.jpg",
  //             "mobilePath": "uploads/mobile/chicken_leg_1-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/chicken_leg_1-thumbnail.jpg"
  //           },
  //           "chicken_leg_2.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "sculpture"
  //               ],
  //               "listitems": [],
  //               "themes": [
  //                 "metal",
  //                 "support"
  //               ],
  //               "year": "2013",
  //               "location": ""
  //             },
  //             "artworkFamily": "Chicken leg",
  //             "displayMain": true,
  //             "themes": [
  //               "metal",
  //               "support"
  //             ],
  //             "seeAlso": [
  //               "foot-with-handle-1.jpg"
  //             ],
  //             "location": "",
  //             "year": "2013",
  //             "_id": "5dfa67aede6a352340297e19",
  //             "category": {
  //               "medium": {
  //                 "sculpture": []
  //               }
  //             },
  //             "filePath": "uploads/chicken_leg_2.jpg",
  //             "fileName": "chicken_leg_2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1618,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/chicken_leg_2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/chicken_leg_2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/chicken_leg_2-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "chicken_leg_2.jpg",
  //             "chicken_leg_1.jpg"
  //           ],
  //           "id": "Chicken leg-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Chicken leg-relatedArtworks"
  //         ]
  //       },
  //       "velniai": {
  //         "files": {
  //           "velniai_wip.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "studio"
  //               ],
  //               "subcategory": [
  //                 "studio",
  //                 "wip"
  //               ],
  //               "listitems": [
  //                 "progress"
  //               ],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "velniai",
  //             "displayMain": null,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2016",
  //             "_id": "5dfa66e3de6a352340297e15",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "ceramics"
  //                 ],
  //                 "graphics": [
  //                   "cg"
  //                 ]
  //               },
  //               "studio": {
  //                 "wip": [
  //                   "progress"
  //                 ],
  //                 "studio": []
  //               }
  //             },
  //             "filePath": "uploads/velniai_wip.jpg",
  //             "fileName": "velniai_wip.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 720,
  //               "naturalHeight": 644
  //             },
  //             "familyDisplayIndex": 2,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/velniai_wip-desktop.jpg",
  //             "mobilePath": "uploads/mobile/velniai_wip-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/velniai_wip-thumbnail.jpg"
  //           },
  //           "velniai_1.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "velniai",
  //             "displayMain": false,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2016",
  //             "_id": "5dfa66e3de6a352340297e13",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "ceramics"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/velniai_1.jpg",
  //             "fileName": "velniai_1.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 540,
  //               "naturalHeight": 720
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/velniai_1-desktop.jpg",
  //             "mobilePath": "uploads/mobile/velniai_1-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/velniai_1-thumbnail.jpg"
  //           },
  //           "velniai_2.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [],
  //               "listitems": [
  //                 "ceramics"
  //               ],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "velniai",
  //             "displayMain": null,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2016",
  //             "_id": "5dfa66e3de6a352340297e14",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "ceramics"
  //                 ]
  //               },
  //               "studio": {
  //                 "studio": [],
  //                 "wip": [
  //                   "progress"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/velniai_2.jpg",
  //             "fileName": "velniai_2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 540,
  //               "naturalHeight": 720
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/velniai_2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/velniai_2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/velniai_2-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "velniai_1.jpg",
  //             "velniai_2.jpg",
  //             "velniai_wip.jpg"
  //           ],
  //           "id": "velniai-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "velniai-relatedArtworks"
  //         ]
  //       },
  //       "Šiaudų batai": {
  //         "files": {
  //           "siaudu_batai_1.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "sculpture"
  //               ],
  //               "listitems": [],
  //               "themes": [
  //                 "social",
  //                 "tools"
  //               ],
  //               "year": "2013",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "Šiaudų batai",
  //             "displayMain": true,
  //             "themes": [
  //               "social",
  //               "tools"
  //             ],
  //             "seeAlso": [
  //               "malonioji_3.jpg"
  //             ],
  //             "location": "London, UK",
  //             "year": "2013",
  //             "_id": "5dfa6af3de6a352340297e29",
  //             "category": {
  //               "medium": {
  //                 "sculpture": []
  //               }
  //             },
  //             "filePath": "uploads/siaudu_batai_1.jpg",
  //             "fileName": "siaudu_batai_1.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "Straw, epoxy resin, stick, audio player, 2 soundtracks by Martynas Svilys and Rowan Wigley. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1440,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/siaudu_batai_1-desktop.jpg",
  //             "mobilePath": "uploads/mobile/siaudu_batai_1-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/siaudu_batai_1-thumbnail.jpg"
  //           },
  //           "siaudu_batai_2.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [
  //                 "other"
  //               ],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Šiaudų batai",
  //             "displayMain": null,
  //             "themes": [
  //               "social",
  //               "tools"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2013",
  //             "_id": "5dfa6af3de6a352340297e2a",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "other"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/siaudu_batai_2.jpg",
  //             "fileName": "siaudu_batai_2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "Straw, epoxy resin, stick, audio player, 2 soundtracks by Martynas Svilys and Rowan Wigley. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1440,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/siaudu_batai_2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/siaudu_batai_2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/siaudu_batai_2-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "siaudu_batai_1.jpg",
  //             "siaudu_batai_2.jpg"
  //           ],
  //           "id": "Šiaudų batai-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Šiaudų batai-relatedArtworks"
  //         ]
  //       },
  //       "Ghost": {
  //         "files": {
  //           "ghost_1.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [
  //                 "misc"
  //               ],
  //               "listitems": [
  //                 "installation"
  //               ],
  //               "themes": [],
  //               "year": "2014",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "Ghost",
  //             "displayMain": null,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5dfa69b1de6a352340297e25",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "installation",
  //                   "plaster"
  //                 ]
  //               },
  //               "studio": {
  //                 "misc": []
  //               }
  //             },
  //             "filePath": "uploads/ghost_1.jpg",
  //             "fileName": "ghost_1.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 614,
  //               "naturalHeight": 920
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/ghost_1-desktop.jpg",
  //             "mobilePath": "uploads/mobile/ghost_1-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/ghost_1-thumbnail.jpg"
  //           },
  //           "ghost_2.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "sculpture"
  //               ],
  //               "listitems": [
  //                 "plaster"
  //               ],
  //               "themes": [
  //                 "metal"
  //               ],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Ghost",
  //             "displayMain": true,
  //             "themes": [
  //               "metal"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5dfa69b1de6a352340297e26",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "plaster"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/ghost_2.jpg",
  //             "fileName": "ghost_2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 720,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/ghost_2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/ghost_2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/ghost_2-thumbnail.jpg"
  //           },
  //           "ghost_3.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "sculpture"
  //               ],
  //               "listitems": [],
  //               "themes": [
  //                 "tools"
  //               ],
  //               "year": "2014",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "Ghost",
  //             "displayMain": null,
  //             "themes": [
  //               "tools"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5dfa69b1de6a352340297e27",
  //             "category": {
  //               "medium": {
  //                 "sculpture": []
  //               }
  //             },
  //             "filePath": "uploads/ghost_3.jpg",
  //             "fileName": "ghost_3.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1543,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 2,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/ghost_3-desktop.jpg",
  //             "mobilePath": "uploads/mobile/ghost_3-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/ghost_3-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "ghost_2.jpg",
  //             "ghost_1.jpg",
  //             "ghost_3.jpg"
  //           ],
  //           "id": "Ghost-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Ghost-relatedArtworks"
  //         ]
  //       },
  //       "Star": {
  //         "files": {
  //           "star_3.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "2014",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "Star",
  //             "displayMain": null,
  //             "themes": [
  //               "celestial body",
  //               "metal"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5dfa6cebde6a352340297e30",
  //             "category": {
  //               "medium": {
  //                 "sculpture": []
  //               }
  //             },
  //             "filePath": "uploads/star_3.jpg",
  //             "fileName": "star_3.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "Plasma-cut steel sheet, lard, adhesive bandage.",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 698,
  //               "naturalHeight": 1034
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/star_3-desktop.jpg",
  //             "mobilePath": "uploads/mobile/star_3-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/star_3-thumbnail.jpg"
  //           },
  //           "star_4.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [
  //                 "sculpture"
  //               ],
  //               "listitems": [],
  //               "themes": [
  //                 "metal"
  //               ],
  //               "year": "2014",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "Star",
  //             "displayMain": true,
  //             "themes": [
  //               "celestial body",
  //               "metal"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5dfa6cebde6a352340297e31",
  //             "category": {
  //               "medium": {
  //                 "sculpture": []
  //               }
  //             },
  //             "filePath": "uploads/star_4.jpg",
  //             "fileName": "star_4.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "Plasma-cut steel sheet, lard, adhesive bandage.",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 676,
  //               "naturalHeight": 964
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/star_4-desktop.jpg",
  //             "mobilePath": "uploads/mobile/star_4-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/star_4-thumbnail.jpg"
  //           },
  //           "star_5.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [
  //                 "cg"
  //               ],
  //               "themes": [
  //                 "celestial body"
  //               ],
  //               "year": "2014",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "Star",
  //             "displayMain": null,
  //             "themes": [
  //               "celestial body",
  //               "metal"
  //             ],
  //             "seeAlso": [
  //               "crescentBoxing.jpg"
  //             ],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5dfa6cebde6a352340297e32",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [],
  //                 "graphics": [
  //                   "cg"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/star_5.jpg",
  //             "fileName": "star_5.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "Plasma-cut steel sheet, lard, adhesive bandage.",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 232,
  //               "naturalHeight": 217
  //             },
  //             "familyDisplayIndex": 2,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/star_5-desktop.jpg",
  //             "mobilePath": "uploads/mobile/star_5-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/star_5-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "star_4.jpg",
  //             "star_3.jpg",
  //             "star_5.jpg"
  //           ],
  //           "id": "Star-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Star-relatedArtworks"
  //         ]
  //       },
  //       "Kolona": {
  //         "files": {
  //           "kolona.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium",
  //                 "studio"
  //               ],
  //               "subcategory": [
  //                 "sculpture",
  //                 "wip"
  //               ],
  //               "listitems": [
  //                 "ceramics",
  //                 "progress"
  //               ],
  //               "themes": [
  //                 "connected spheres",
  //                 "support"
  //               ],
  //               "year": "2019",
  //               "location": "Panevėžys, Lithuania"
  //             },
  //             "artworkFamily": "Kolona",
  //             "displayMain": true,
  //             "themes": [
  //               "connected spheres",
  //               "support"
  //             ],
  //             "seeAlso": [
  //               "foot-with-handle-1.jpg"
  //             ],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2019",
  //             "_id": "5dfa6e64de6a352340297e35",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "ceramics"
  //                 ]
  //               },
  //               "studio": {
  //                 "wip": [
  //                   "progress"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/kolona.jpg",
  //             "fileName": "kolona.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 608,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/kolona-desktop.jpg",
  //             "mobilePath": "uploads/mobile/kolona-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/kolona-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "kolona.jpg"
  //           ],
  //           "id": "Kolona-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Kolona-relatedArtworks"
  //         ]
  //       },
  //       "Stage kieme": {
  //         "files": {
  //           "stage_kieme_1.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "sculpture"
  //               ],
  //               "listitems": [
  //                 "other"
  //               ],
  //               "themes": [
  //                 "stage",
  //                 "connected spheres"
  //               ],
  //               "year": "2016",
  //               "location": "Panevėžys, Lithuania"
  //             },
  //             "artworkFamily": "Stage kieme",
  //             "displayMain": false,
  //             "themes": [
  //               "stage",
  //               "connected spheres"
  //             ],
  //             "seeAlso": [
  //               "connectedSpheres2.jpg",
  //               "WP_20150814_007.jpg",
  //               "malonioji_1.jpg",
  //               "malonioji_4.jpg"
  //             ],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2016",
  //             "_id": "5dfa6b98de6a352340297e2d",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "other"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/stage_kieme_1.jpg",
  //             "fileName": "stage_kieme_1.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1613,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/stage_kieme_1-desktop.jpg",
  //             "mobilePath": "uploads/mobile/stage_kieme_1-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/stage_kieme_1-thumbnail.jpg"
  //           },
  //           "stage_kieme_2.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Stage kieme",
  //             "displayMain": false,
  //             "themes": [
  //               "stage",
  //               "connected spheres"
  //             ],
  //             "seeAlso": [
  //               "detail_testciles_2.jpg"
  //             ],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2016",
  //             "_id": "5dfa6b98de6a352340297e2c",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "other"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/stage_kieme_2.jpg",
  //             "fileName": "stage_kieme_2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 743,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/stage_kieme_2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/stage_kieme_2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/stage_kieme_2-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "stage_kieme_2.jpg",
  //             "stage_kieme_1.jpg"
  //           ],
  //           "id": "Stage kieme-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Stage kieme-relatedArtworks"
  //         ]
  //       },
  //       "James' print": {
  //         "files": {
  //           "james_print_2.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "graphics",
  //                 "photo"
  //               ],
  //               "listitems": [
  //                 "print material",
  //                 "color"
  //               ],
  //               "themes": [
  //                 "social",
  //                 "fruit"
  //               ],
  //               "year": "2013",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "James' print",
  //             "displayMain": null,
  //             "themes": [
  //               "social",
  //               "fruit"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2013",
  //             "_id": "5dfa76b9de6a352340297e37",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "print material"
  //                 ],
  //                 "photo": [
  //                   "color"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/james_print_2.jpg",
  //             "fileName": "james_print_2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "I attended a dinner party and brought a bouquet of cabbage leaves and a banana. I asked the host to photograph it, print it and leave the photograph in my studio as we were course mates. He complied, but on reverse left a note. I asked to cross that out and return once that is done. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 509,
  //               "naturalHeight": 720
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/james_print_2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/james_print_2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/james_print_2-thumbnail.jpg"
  //           },
  //           "james_print_1.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "graphics",
  //                 "photo"
  //               ],
  //               "listitems": [
  //                 "print material",
  //                 "color"
  //               ],
  //               "themes": [
  //                 "social",
  //                 "fruit"
  //               ],
  //               "year": "2013",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "James' print",
  //             "displayMain": true,
  //             "themes": [
  //               "social",
  //               "fruit"
  //             ],
  //             "seeAlso": [
  //               "james-1.jpg",
  //               "james-2.jpg"
  //             ],
  //             "location": "London, UK",
  //             "year": "2013",
  //             "_id": "5dfa76b9de6a352340297e38",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "print material"
  //                 ],
  //                 "photo": [
  //                   "color"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/james_print_1.jpg",
  //             "fileName": "james_print_1.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "I attended a dinner party and brought a bouquet of cabbage leaves and a banana. I asked the host to photograph it, print it and leave the photograph in my studio as we were course mates. He complied, but on reverse left a note. I asked to cross that out and return once that is done. ",
  //             "artworkTitle": null,
  //             "artworkDescription": "An enlarged print of this image featured in a self-organized display of posters in a staircase of a social estate in London, UK.",
  //             "naturalSize": {
  //               "naturalWidth": 716,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/james_print_1-desktop.jpg",
  //             "mobilePath": "uploads/mobile/james_print_1-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/james_print_1-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "james_print_1.jpg",
  //             "james_print_2.jpg"
  //           ],
  //           "id": "James' print-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "James' print-relatedArtworks"
  //         ]
  //       },
  //       "Beach service": {
  //         "files": {
  //           "upe5.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium",
  //                 "public"
  //               ],
  //               "subcategory": [
  //                 "photo",
  //                 "other"
  //               ],
  //               "listitems": [
  //                 "b/w"
  //               ],
  //               "themes": [],
  //               "year": "2014",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "Beach service",
  //             "displayMain": true,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5dfa7d0a061ab618f4ee6be6",
  //             "category": {
  //               "medium": {
  //                 "photo": [
  //                   "b/w"
  //                 ]
  //               },
  //               "public": {
  //                 "other": []
  //               }
  //             },
  //             "filePath": "uploads/upe5.jpg",
  //             "fileName": "upe5.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "Clearing a rocky Thames beach at Surrey Quays, London.",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1620,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/upe5-desktop.jpg",
  //             "mobilePath": "uploads/mobile/upe5-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/upe5-thumbnail.jpg"
  //           },
  //           "upe6.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium",
  //                 "public"
  //               ],
  //               "subcategory": [
  //                 "photo",
  //                 "other"
  //               ],
  //               "listitems": [
  //                 "b/w"
  //               ],
  //               "themes": [],
  //               "year": "2014",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "Beach service",
  //             "displayMain": null,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5dfa7d0a061ab618f4ee6be5",
  //             "category": {
  //               "medium": {
  //                 "photo": [
  //                   "b/w"
  //                 ]
  //               },
  //               "public": {
  //                 "other": []
  //               }
  //             },
  //             "filePath": "uploads/upe6.jpg",
  //             "fileName": "upe6.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "Clearing a rocky Thames beach at Surrey Quays, London.",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1620,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/upe6-desktop.jpg",
  //             "mobilePath": "uploads/mobile/upe6-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/upe6-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "upe5.jpg",
  //             "upe6.jpg"
  //           ],
  //           "id": "Beach service-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Beach service-relatedArtworks"
  //         ]
  //       },
  //       "Lorenzo": {
  //         "files": {
  //           "65710021.JPG": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [
  //                 "color"
  //               ],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Lorenzo",
  //             "displayMain": null,
  //             "themes": [
  //               "social",
  //               "restaurant"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5dfa7981de6a352340297e3a",
  //             "category": {
  //               "medium": {
  //                 "photo": [
  //                   "color"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/65710021.JPG",
  //             "fileName": "65710021.JPG",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "I ask my two friends and coworkers, both named Lorenzo, to act as models in a couple of scenes. Photographed by Rowan Wigley.",
  //             "artworkTitle": "Hospitality",
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1544,
  //               "naturalHeight": 1024
  //             },
  //             "familyDisplayIndex": 4,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/65710021-desktop.JPG",
  //             "mobilePath": "uploads/mobile/65710021-mob.JPG",
  //             "thumbnailPath": "uploads/thumbnails/65710021-thumbnail.JPG"
  //           },
  //           "Untitled31.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "photo"
  //               ],
  //               "listitems": [
  //                 "b/w"
  //               ],
  //               "themes": [
  //                 "social"
  //               ],
  //               "year": "2014",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "Lorenzo",
  //             "displayMain": null,
  //             "themes": [
  //               "social"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5dfa7981de6a352340297e3d",
  //             "category": {
  //               "medium": {
  //                 "photo": [
  //                   "b/w"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/Untitled31.jpg",
  //             "fileName": "Untitled31.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "I ask my two friends and coworkers, both named Lorenzo, to act as models in a couple of scenes. Photographed by Rowan Wigley.",
  //             "artworkTitle": "Fever",
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1552,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 2,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/Untitled31-desktop.jpg",
  //             "mobilePath": "uploads/mobile/Untitled31-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/Untitled31-thumbnail.jpg"
  //           },
  //           "Untitled54.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [
  //                 "social"
  //               ],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Lorenzo",
  //             "displayMain": null,
  //             "themes": [
  //               "social",
  //               "restaurant"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5dfa7981de6a352340297e40",
  //             "category": {
  //               "medium": {
  //                 "photo": [
  //                   "b/w"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/Untitled54.jpg",
  //             "fileName": "Untitled54.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "I ask my two friends and coworkers, both named Lorenzo, to act as models in a couple of scenes. Photographed by Rowan Wigley.",
  //             "artworkTitle": "Hospitality",
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1673,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/Untitled54-desktop.jpg",
  //             "mobilePath": "uploads/mobile/Untitled54-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/Untitled54-thumbnail.jpg"
  //           },
  //           "Untitled32.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Lorenzo",
  //             "displayMain": false,
  //             "themes": [
  //               "social"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5dfa7981de6a352340297e3e",
  //             "category": {
  //               "medium": {
  //                 "photo": [
  //                   "b/w"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/Untitled32.jpg",
  //             "fileName": "Untitled32.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "I ask my two friends and coworkers, both named Lorenzo, to act as models in a couple of scenes. Photographed by Rowan Wigley.",
  //             "artworkTitle": "Fever",
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1617,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 3,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/Untitled32-desktop.jpg",
  //             "mobilePath": "uploads/mobile/Untitled32-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/Untitled32-thumbnail.jpg"
  //           },
  //           "Untitled42.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "photo"
  //               ],
  //               "listitems": [
  //                 "b/w"
  //               ],
  //               "themes": [
  //                 "restaurant"
  //               ],
  //               "year": "2014",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "Lorenzo",
  //             "displayMain": true,
  //             "themes": [
  //               "social",
  //               "restaurant"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5dfa7981de6a352340297e3f",
  //             "category": {
  //               "medium": {
  //                 "photo": [
  //                   "b/w"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/Untitled42.jpg",
  //             "fileName": "Untitled42.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "I ask my two friends and coworkers, both named Lorenzo, to act as models in a couple of scenes. Photographed by Rowan Wigley.",
  //             "artworkTitle": "Hospitality",
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1650,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/Untitled42-desktop.jpg",
  //             "mobilePath": "uploads/mobile/Untitled42-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/Untitled42-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "Untitled42.jpg",
  //             "Untitled54.jpg",
  //             "Untitled31.jpg",
  //             "Untitled32.jpg",
  //             "65710021.JPG"
  //           ],
  //           "id": "Lorenzo-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Lorenzo-relatedArtworks"
  //         ]
  //       },
  //       "Corridor": {
  //         "files": {},
  //         "column": {
  //           "fileIds": [],
  //           "id": "Corridor-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Corridor-relatedArtworks"
  //         ]
  //       },
  //       "Pagalys": {
  //         "files": {
  //           "tumblr_m1rb2rhvez1rsi2gco2_1280.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "public"
  //               ],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [
  //                 "furniture"
  //               ],
  //               "year": "2011",
  //               "location": "Panevėžys, Lithuania"
  //             },
  //             "artworkFamily": "Pagalys",
  //             "displayMain": false,
  //             "themes": [
  //               "furniture"
  //             ],
  //             "seeAlso": [
  //               "malonioji_4.jpg"
  //             ],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2011",
  //             "_id": "5dfa7d88061ab618f4ee6be8",
  //             "category": {
  //               "medium": {
  //                 "sculpture": []
  //               },
  //               "public": {
  //                 "other": []
  //               }
  //             },
  //             "filePath": "uploads/tumblr_m1rb2rhvez1rsi2gco2_1280.jpg",
  //             "fileName": "tumblr_m1rb2rhvez1rsi2gco2_1280.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 720,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/tumblr_m1rb2rhvez1rsi2gco2_1280-desktop.jpg",
  //             "mobilePath": "uploads/mobile/tumblr_m1rb2rhvez1rsi2gco2_1280-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/tumblr_m1rb2rhvez1rsi2gco2_1280-thumbnail.jpg"
  //           },
  //           "tumblr_m1rb2rhvez1rsi2gco3_1280.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "sculpture",
  //                 "other"
  //               ],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Pagalys",
  //             "displayMain": null,
  //             "themes": [
  //               "furniture"
  //             ],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2011",
  //             "_id": "5dfa7d88061ab618f4ee6be9",
  //             "category": {
  //               "medium": {
  //                 "sculpture": []
  //               },
  //               "public": {
  //                 "other": []
  //               }
  //             },
  //             "filePath": "uploads/tumblr_m1rb2rhvez1rsi2gco3_1280.jpg",
  //             "fileName": "tumblr_m1rb2rhvez1rsi2gco3_1280.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": null,
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1621,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/tumblr_m1rb2rhvez1rsi2gco3_1280-desktop.jpg",
  //             "mobilePath": "uploads/mobile/tumblr_m1rb2rhvez1rsi2gco3_1280-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/tumblr_m1rb2rhvez1rsi2gco3_1280-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "tumblr_m1rb2rhvez1rsi2gco2_1280.jpg",
  //             "tumblr_m1rb2rhvez1rsi2gco3_1280.jpg"
  //           ],
  //           "id": "Pagalys-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Pagalys-relatedArtworks"
  //         ]
  //       },
  //       "North aligned frame": {
  //         "files": {
  //           "north_3.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": "",
  //               "artworkDescription": []
  //             },
  //             "artworkFamily": "North aligned frame",
  //             "displayMain": null,
  //             "themes": [
  //               "frame"
  //             ],
  //             "seeAlso": [],
  //             "location": "Coldbath street, London, UK",
  //             "year": "2015",
  //             "_id": "5e02885219a99537e42a859d",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "plaster"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/north_3.jpg",
  //             "fileName": "north_3.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1440,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 2,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/north_3-desktop.jpg",
  //             "mobilePath": "uploads/mobile/north_3-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/north_3-thumbnail.jpg"
  //           },
  //           "north_2.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [
  //                 "sculpture"
  //               ],
  //               "listitems": [
  //                 "plaster"
  //               ],
  //               "themes": [],
  //               "year": "2015",
  //               "location": "Coldbath street, London, UK"
  //             },
  //             "artworkFamily": "North aligned frame",
  //             "displayMain": null,
  //             "themes": [
  //               "frame"
  //             ],
  //             "seeAlso": [],
  //             "location": "Coldbath street, London, UK",
  //             "year": "2015",
  //             "_id": "5e02885319a99537e42a859f",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "plaster"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/north_2.jpg",
  //             "fileName": "north_2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 2336,
  //               "naturalHeight": 1455
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/north_2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/north_2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/north_2-thumbnail.jpg"
  //           },
  //           "north_1.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [
  //                 "frame"
  //               ],
  //               "year": "",
  //               "location": "",
  //               "artworkDescription": []
  //             },
  //             "artworkFamily": "North aligned frame",
  //             "displayMain": true,
  //             "themes": [
  //               "frame"
  //             ],
  //             "seeAlso": [],
  //             "location": "Coldbath street, London, UK",
  //             "year": "2015",
  //             "_id": "5e02885319a99537e42a859e",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "plaster"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/north_1.jpg",
  //             "fileName": "north_1.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1440,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/north_1-desktop.jpg",
  //             "mobilePath": "uploads/mobile/north_1-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/north_1-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "north_1.jpg",
  //             "north_2.jpg",
  //             "north_3.jpg"
  //           ],
  //           "id": "North aligned frame-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "North aligned frame-relatedArtworks"
  //         ]
  //       },
  //       "Poilsis": {
  //         "files": {
  //           "malonioji_3.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium",
  //                 "public"
  //               ],
  //               "subcategory": [
  //                 "sculpture",
  //                 "exhibitions"
  //               ],
  //               "listitems": [
  //                 "installation",
  //                 "malonioji"
  //               ],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Poilsis",
  //             "displayMain": true,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "Vilnius, Lithuania",
  //             "year": "2015",
  //             "_id": "5dfe01f7e7c9572b24e752a8",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "installation"
  //                 ]
  //               },
  //               "public": {
  //                 "exhibitions": [
  //                   "malonioji"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/malonioji_3.jpg",
  //             "fileName": "malonioji_3.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "Exhibition and bts shots from an exhibition called Daiktai Sandėlyje.",
  //             "artworkTitle": "Gitaxian Probe",
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 771,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/malonioji_3-desktop.jpg",
  //             "mobilePath": "uploads/mobile/malonioji_3-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/malonioji_3-thumbnail.jpg"
  //           },
  //           "malonioji_1.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium",
  //                 "public"
  //               ],
  //               "subcategory": [
  //                 "sculpture",
  //                 "exhibitions"
  //               ],
  //               "listitems": [
  //                 "installation",
  //                 "malonioji"
  //               ],
  //               "themes": [],
  //               "year": "2015",
  //               "location": "Vilnius, Lithuania"
  //             },
  //             "artworkFamily": "Poilsis",
  //             "displayMain": true,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "Vilnius, Lithuania",
  //             "year": "2015",
  //             "_id": "5dfe01f7e7c9572b24e752a9",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "installation"
  //                 ]
  //               },
  //               "public": {
  //                 "exhibitions": [
  //                   "malonioji"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/malonioji_1.jpg",
  //             "fileName": "malonioji_1.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "Exhibition and bts shots from an exhibition called Daiktai Sandėlyje.",
  //             "artworkTitle": "Stack",
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 721,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 2,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/malonioji_1-desktop.jpg",
  //             "mobilePath": "uploads/mobile/malonioji_1-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/malonioji_1-thumbnail.jpg"
  //           },
  //           "malonioji_2.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Poilsis",
  //             "displayMain": null,
  //             "themes": [
  //               "cards"
  //             ],
  //             "seeAlso": [],
  //             "location": "Vilnius, Lithuania",
  //             "year": "2015",
  //             "_id": "5dfe01f7e7c9572b24e752aa",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "installation"
  //                 ]
  //               },
  //               "public": {
  //                 "exhibitions": [
  //                   "malonioji"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/malonioji_2.jpg",
  //             "fileName": "malonioji_2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "Exhibition and bts shots from an exhibition called Daiktai Sandėlyje.",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1618,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/malonioji_2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/malonioji_2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/malonioji_2-thumbnail.jpg"
  //           },
  //           "malonioji_4.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium",
  //                 "public"
  //               ],
  //               "subcategory": [
  //                 "sculpture",
  //                 "exhibitions"
  //               ],
  //               "listitems": [
  //                 "installation",
  //                 "malonioji"
  //               ],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Poilsis",
  //             "displayMain": true,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "Vilnius, Lithuania",
  //             "year": "2015",
  //             "_id": "5dfe01f7e7c9572b24e752ab",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "installation"
  //                 ]
  //               },
  //               "public": {
  //                 "exhibitions": [
  //                   "malonioji"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/malonioji_4.jpg",
  //             "fileName": "malonioji_4.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "Exhibition and bts shots from an exhibition called Daiktai Sandėlyje.",
  //             "artworkTitle": "Shelf",
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 721,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 3,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/malonioji_4-desktop.jpg",
  //             "mobilePath": "uploads/mobile/malonioji_4-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/malonioji_4-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "malonioji_3.jpg",
  //             "malonioji_2.jpg",
  //             "malonioji_1.jpg",
  //             "malonioji_4.jpg"
  //           ],
  //           "id": "Poilsis-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Poilsis-relatedArtworks"
  //         ]
  //       },
  //       "Restaurant": {
  //         "files": {
  //           "WP_20150806_007.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [
  //                 "misc"
  //               ],
  //               "listitems": [],
  //               "themes": [
  //                 "restaurant",
  //                 "tools"
  //               ],
  //               "year": "2014",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "Restaurant",
  //             "displayMain": true,
  //             "themes": [
  //               "restaurant",
  //               "tools"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5dfa7f26061ab618f4ee6bee",
  //             "category": {
  //               "studio": {
  //                 "misc": []
  //               }
  //             },
  //             "filePath": "uploads/WP_20150806_007.jpg",
  //             "fileName": "WP_20150806_007.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "Service trays arranged on restaurant furniture. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 607,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/WP_20150806_007-desktop.jpg",
  //             "mobilePath": "uploads/mobile/WP_20150806_007-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/WP_20150806_007-thumbnail.jpg"
  //           },
  //           "WP_20150806_004.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Restaurant",
  //             "displayMain": true,
  //             "themes": [
  //               "restaurant",
  //               "tools"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5dfa7f26061ab618f4ee6bef",
  //             "category": {
  //               "studio": {
  //                 "misc": []
  //               }
  //             },
  //             "filePath": "uploads/WP_20150806_004.jpg",
  //             "fileName": "WP_20150806_004.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "Service trays arranged on restaurant furniture. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 607,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/WP_20150806_004-desktop.jpg",
  //             "mobilePath": "uploads/mobile/WP_20150806_004-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/WP_20150806_004-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "WP_20150806_007.jpg",
  //             "WP_20150806_004.jpg"
  //           ],
  //           "id": "Restaurant-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Restaurant-relatedArtworks"
  //         ]
  //       },
  //       "_archive": {
  //         "files": {
  //           "gradient6.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "_archive",
  //             "displayMain": null,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "",
  //             "year": "",
  //             "_id": "5df2cdf840edab1940975b33",
  //             "category": {
  //               "studio": {
  //                 "misc": []
  //               }
  //             },
  //             "filePath": "uploads/gradient6.jpg",
  //             "fileName": "gradient6.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 731,
  //               "naturalHeight": 857
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/gradient6-desktop.jpg",
  //             "mobilePath": "uploads/mobile/gradient6-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/gradient6-thumbnail.jpg"
  //           },
  //           "gradient5.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "_archive",
  //             "displayMain": false,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "",
  //             "year": "",
  //             "_id": "5df2cdf840edab1940975b35",
  //             "category": {
  //               "studio": {
  //                 "misc": []
  //               }
  //             },
  //             "filePath": "uploads/gradient5.jpg",
  //             "fileName": "gradient5.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1865,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 4,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/gradient5-desktop.jpg",
  //             "mobilePath": "uploads/mobile/gradient5-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/gradient5-thumbnail.jpg"
  //           },
  //           "chicken_leg_wip_2.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "_archive",
  //             "displayMain": null,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "",
  //             "year": "",
  //             "_id": "5dfa67aede6a352340297e1b",
  //             "category": {
  //               "studio": {
  //                 "misc": []
  //               }
  //             },
  //             "filePath": "uploads/chicken_leg_wip_2.jpg",
  //             "fileName": "chicken_leg_wip_2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 705,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 2,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/chicken_leg_wip_2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/chicken_leg_wip_2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/chicken_leg_wip_2-thumbnail.jpg"
  //           },
  //           "07022012710.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "_archive",
  //             "displayMain": false,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "",
  //             "year": "",
  //             "_id": "5dfa7e04061ab618f4ee6beb",
  //             "category": {
  //               "studio": {
  //                 "misc": []
  //               }
  //             },
  //             "filePath": "uploads/07022012710.jpg",
  //             "fileName": "07022012710.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1440,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 8,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/07022012710-desktop.jpg",
  //             "mobilePath": "uploads/mobile/07022012710-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/07022012710-thumbnail.jpg"
  //           },
  //           "20170926_184020.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "_archive",
  //             "displayMain": null,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "",
  //             "year": "",
  //             "_id": "5dfa7f26061ab618f4ee6bed",
  //             "category": {
  //               "studio": {
  //                 "misc": []
  //               }
  //             },
  //             "filePath": "uploads/20170926_184020.jpg",
  //             "fileName": "20170926_184020.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": "",
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 608,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 6,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/20170926_184020-desktop.jpg",
  //             "mobilePath": "uploads/mobile/20170926_184020-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/20170926_184020-thumbnail.jpg"
  //           },
  //           "staircase-after-1.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "_archive",
  //             "displayMain": null,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "",
  //             "year": "",
  //             "_id": "5e08865212172c2514bdb693",
  //             "category": {
  //               "studio": {
  //                 "misc": []
  //               }
  //             },
  //             "filePath": "uploads/staircase-after-1.jpg",
  //             "fileName": "staircase-after-1.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 607,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/staircase-after-1-desktop.jpg",
  //             "mobilePath": "uploads/mobile/staircase-after-1-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/staircase-after-1-thumbnail.jpg"
  //           },
  //           "foot-with-handle-4.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "_archive",
  //             "displayMain": null,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "",
  //             "year": "",
  //             "_id": "5e0a137d9ed2212d50717691",
  //             "category": {
  //               "studio": {
  //                 "misc": []
  //               }
  //             },
  //             "filePath": "uploads/foot-with-handle-4.jpg",
  //             "fileName": "foot-with-handle-4.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 608,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 7,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/foot-with-handle-4-desktop.jpg",
  //             "mobilePath": "uploads/mobile/foot-with-handle-4-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/foot-with-handle-4-thumbnail.jpg"
  //           },
  //           "youdo6.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "_archive",
  //             "displayMain": null,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "",
  //             "year": "",
  //             "_id": "5e0e6297208f711970b7397e",
  //             "category": {
  //               "studio": {
  //                 "misc": []
  //               }
  //             },
  //             "filePath": "uploads/youdo6.jpg",
  //             "fileName": "youdo6.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1440,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 3,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/youdo6-desktop.jpg",
  //             "mobilePath": "uploads/mobile/youdo6-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/youdo6-thumbnail.jpg"
  //           },
  //           "youdo8-0.JPG": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "_archive",
  //             "displayMain": null,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "",
  //             "year": "",
  //             "_id": "5e0e6297208f711970b73982",
  //             "category": {
  //               "studio": {
  //                 "misc": []
  //               }
  //             },
  //             "filePath": "uploads/youdo8-0.JPG",
  //             "fileName": "youdo8-0.JPG",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 4288,
  //               "naturalHeight": 3216
  //             },
  //             "familyDisplayIndex": 5,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/youdo8-0-desktop.JPG",
  //             "mobilePath": "uploads/mobile/youdo8-0-mob.JPG",
  //             "thumbnailPath": "uploads/thumbnails/youdo8-0-thumbnail.JPG"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "staircase-after-1.jpg",
  //             "gradient6.jpg",
  //             "chicken_leg_wip_2.jpg",
  //             "youdo6.jpg",
  //             "gradient5.jpg",
  //             "youdo8-0.JPG",
  //             "20170926_184020.jpg",
  //             "foot-with-handle-4.jpg",
  //             "07022012710.jpg"
  //           ],
  //           "id": "_archive-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "_archive-relatedArtworks"
  //         ]
  //       },
  //       "Mushroom": {
  //         "files": {
  //           "mushroom-strawberry.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "sculpture"
  //               ],
  //               "listitems": [],
  //               "themes": [
  //                 "metal"
  //               ],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Mushroom",
  //             "displayMain": true,
  //             "themes": [
  //               "metal"
  //             ],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2018",
  //             "_id": "5df6d50a266b6a2cf4384b5f",
  //             "category": {
  //               "medium": {
  //                 "sculpture": []
  //               }
  //             },
  //             "filePath": "uploads/mushroom-strawberry.jpg",
  //             "fileName": "mushroom-strawberry.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": "Mushroom (strawberry)",
  //             "artworkDescription": "Roll-pressed steel sheet, spray paint. Low relief.",
  //             "naturalSize": {
  //               "naturalWidth": 779,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/mushroom-strawberry-desktop.jpg",
  //             "mobilePath": "uploads/mobile/mushroom-strawberry-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/mushroom-strawberry-thumbnail.jpg"
  //           },
  //           "WP_20180421_18_00_14_Pro.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "sculpture"
  //               ],
  //               "listitems": [],
  //               "themes": [
  //                 "metal"
  //               ],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Mushroom",
  //             "displayMain": null,
  //             "themes": [
  //               "metal"
  //             ],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2018",
  //             "_id": "5e0a0b7c9ed2212d5071767f",
  //             "category": {
  //               "medium": {
  //                 "sculpture": []
  //               }
  //             },
  //             "filePath": "uploads/WP_20180421_18_00_14_Pro.jpg",
  //             "fileName": "WP_20180421_18_00_14_Pro.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 608,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/WP_20180421_18_00_14_Pro-desktop.jpg",
  //             "mobilePath": "uploads/mobile/WP_20180421_18_00_14_Pro-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/WP_20180421_18_00_14_Pro-thumbnail.jpg"
  //           },
  //           "WP_20180421_18_00_35_Pro.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "sculpture"
  //               ],
  //               "listitems": [],
  //               "themes": [
  //                 "metal"
  //               ],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Mushroom",
  //             "displayMain": null,
  //             "themes": [
  //               "metal"
  //             ],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2018",
  //             "_id": "5e0a0b7c9ed2212d50717680",
  //             "category": {
  //               "medium": {
  //                 "sculpture": []
  //               }
  //             },
  //             "filePath": "uploads/WP_20180421_18_00_35_Pro.jpg",
  //             "fileName": "WP_20180421_18_00_35_Pro.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 608,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 2,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/WP_20180421_18_00_35_Pro-desktop.jpg",
  //             "mobilePath": "uploads/mobile/WP_20180421_18_00_35_Pro-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/WP_20180421_18_00_35_Pro-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "mushroom-strawberry.jpg",
  //             "WP_20180421_18_00_14_Pro.jpg",
  //             "WP_20180421_18_00_35_Pro.jpg"
  //           ],
  //           "id": "Mushroom-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Mushroom-relatedArtworks"
  //         ]
  //       },
  //       "Staircase": {
  //         "files": {
  //           "staircase-2-000.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Staircase",
  //             "displayMain": null,
  //             "themes": [
  //               "social",
  //               "staircase"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5e0883be12172c2514bdb68c",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "print material"
  //                 ]
  //               },
  //               "public": {
  //                 "other": []
  //               }
  //             },
  //             "filePath": "uploads/staircase-2-000.jpg",
  //             "fileName": "staircase-2-000.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "A show of posters in a social estate in London, UK. Poster images by Stacey Broadbent, Alex Gengos, Jonas Lozoraitis, James Stradner, Martynas Svilys, Rowan Wigley,  and me. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 746,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/staircase-2-000-desktop.jpg",
  //             "mobilePath": "uploads/mobile/staircase-2-000-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/staircase-2-000-thumbnail.jpg"
  //           },
  //           "staircase-2-00.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Staircase",
  //             "displayMain": null,
  //             "themes": [
  //               "social",
  //               "staircase"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5e0883be12172c2514bdb68d",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "print material"
  //                 ]
  //               },
  //               "public": {
  //                 "other": []
  //               }
  //             },
  //             "filePath": "uploads/staircase-2-00.jpg",
  //             "fileName": "staircase-2-00.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "A show of posters in a social estate in London, UK. Poster images by Stacey Broadbent, Alex Gengos, Jonas Lozoraitis, James Stradner, Martynas Svilys, Rowan Wigley,  and me. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 810,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/staircase-2-00-desktop.jpg",
  //             "mobilePath": "uploads/mobile/staircase-2-00-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/staircase-2-00-thumbnail.jpg"
  //           },
  //           "staircase-2-3.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Staircase",
  //             "displayMain": null,
  //             "themes": [
  //               "social",
  //               "staircase"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5e0883be12172c2514bdb690",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "print material"
  //                 ]
  //               },
  //               "public": {
  //                 "other": []
  //               }
  //             },
  //             "filePath": "uploads/staircase-2-3.jpg",
  //             "fileName": "staircase-2-3.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "A show of posters in a social estate in London, UK. Poster images by Stacey Broadbent, Alex Gengos, Jonas Lozoraitis, James Stradner, Martynas Svilys, Rowan Wigley,  and me. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 607,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 4,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/staircase-2-3-desktop.jpg",
  //             "mobilePath": "uploads/mobile/staircase-2-3-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/staircase-2-3-thumbnail.jpg"
  //           },
  //           "staircase-2-4.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Staircase",
  //             "displayMain": null,
  //             "themes": [
  //               "social",
  //               "staircase"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5e0883be12172c2514bdb691",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "print material"
  //                 ]
  //               },
  //               "public": {
  //                 "other": []
  //               }
  //             },
  //             "filePath": "uploads/staircase-2-4.jpg",
  //             "fileName": "staircase-2-4.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "A show of posters in a social estate in London, UK. Poster images by Stacey Broadbent, Alex Gengos, Jonas Lozoraitis, James Stradner, Martynas Svilys, Rowan Wigley,  and me. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 607,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 5,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/staircase-2-4-desktop.jpg",
  //             "mobilePath": "uploads/mobile/staircase-2-4-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/staircase-2-4-thumbnail.jpg"
  //           },
  //           "staircase-2-1.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Staircase",
  //             "displayMain": null,
  //             "themes": [
  //               "social",
  //               "staircase"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5e0883be12172c2514bdb68f",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "print material"
  //                 ]
  //               },
  //               "public": {
  //                 "other": []
  //               }
  //             },
  //             "filePath": "uploads/staircase-2-1.jpg",
  //             "fileName": "staircase-2-1.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "A show of posters in a social estate in London, UK. Poster images by Stacey Broadbent, Alex Gengos, Jonas Lozoraitis, James Stradner, Martynas Svilys, Rowan Wigley,  and me. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 776,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 3,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/staircase-2-1-desktop.jpg",
  //             "mobilePath": "uploads/mobile/staircase-2-1-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/staircase-2-1-thumbnail.jpg"
  //           },
  //           "staircase-2-0.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "public"
  //               ],
  //               "subcategory": [
  //                 "other"
  //               ],
  //               "listitems": [
  //                 "print material"
  //               ],
  //               "themes": [
  //                 "social",
  //                 "staircase"
  //               ],
  //               "year": "2014",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "Staircase",
  //             "displayMain": true,
  //             "themes": [
  //               "social",
  //               "staircase"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5e0883be12172c2514bdb68e",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "print material"
  //                 ]
  //               },
  //               "public": {
  //                 "other": []
  //               }
  //             },
  //             "filePath": "uploads/staircase-2-0.jpg",
  //             "fileName": "staircase-2-0.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "A show of posters in a social estate in London, UK. Poster images by Stacey Broadbent, Alex Gengos, Jonas Lozoraitis, James Stradner, Martynas Svilys, Rowan Wigley,  and me. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 810,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 2,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/staircase-2-0-desktop.jpg",
  //             "mobilePath": "uploads/mobile/staircase-2-0-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/staircase-2-0-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "staircase-2-000.jpg",
  //             "staircase-2-00.jpg",
  //             "staircase-2-0.jpg",
  //             "staircase-2-1.jpg",
  //             "staircase-2-3.jpg",
  //             "staircase-2-4.jpg"
  //           ],
  //           "id": "Staircase-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Staircase-relatedArtworks"
  //         ]
  //       },
  //       "Blue frame": {
  //         "files": {
  //           "blue-frame-1.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "sculpture"
  //               ],
  //               "listitems": [
  //                 "ceramics"
  //               ],
  //               "themes": [
  //                 "frame"
  //               ],
  //               "year": "2019",
  //               "location": "Panevėžys, Lithuania"
  //             },
  //             "artworkFamily": "Blue frame",
  //             "displayMain": true,
  //             "themes": [
  //               "frame"
  //             ],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2019",
  //             "_id": "5e0a0e149ed2212d50717687",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "ceramics"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/blue-frame-1.jpg",
  //             "fileName": "blue-frame-1.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "Unfired clay frame covered with paraffin wax and spray painted blue. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1196,
  //               "naturalHeight": 720
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/blue-frame-1-desktop.jpg",
  //             "mobilePath": "uploads/mobile/blue-frame-1-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/blue-frame-1-thumbnail.jpg"
  //           },
  //           "blue-frame-2.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [
  //                 "studio",
  //                 "wip"
  //               ],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Blue frame",
  //             "displayMain": null,
  //             "themes": [
  //               "frame"
  //             ],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2019",
  //             "_id": "5e0a0e149ed2212d50717688",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "ceramics"
  //                 ]
  //               },
  //               "studio": {
  //                 "studio": [],
  //                 "wip": []
  //               }
  //             },
  //             "filePath": "uploads/blue-frame-2.jpg",
  //             "fileName": "blue-frame-2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "Unfired clay frame covered with paraffin wax and spray painted blue. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1920,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/blue-frame-2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/blue-frame-2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/blue-frame-2-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "blue-frame-1.jpg",
  //             "blue-frame-2.jpg"
  //           ],
  //           "id": "Blue frame-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Blue frame-relatedArtworks"
  //         ]
  //       },
  //       "Staircase-participants": {
  //         "files": {
  //           "alex.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Staircase-participants",
  //             "displayMain": null,
  //             "themes": [
  //               "staircase",
  //               "social"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2015",
  //             "_id": "5e08980712172c2514bdb697",
  //             "category": {
  //               "medium": {
  //                 "photo": []
  //               }
  //             },
  //             "filePath": "uploads/alex.jpg",
  //             "fileName": "alex.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": "A glazed ceramic bowl on a spray painted styrofoam plint by Alex Gengos.",
  //             "naturalSize": {
  //               "naturalWidth": 718,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/alex-desktop.jpg",
  //             "mobilePath": "uploads/mobile/alex-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/alex-thumbnail.jpg"
  //           },
  //           "james-2.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Staircase-participants",
  //             "displayMain": null,
  //             "themes": [
  //               "staircase",
  //               "social"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2015",
  //             "_id": "5e08987f12172c2514bdb698",
  //             "category": {
  //               "medium": {
  //                 "photo": []
  //               }
  //             },
  //             "filePath": "uploads/james-2.jpg",
  //             "fileName": "james-2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": "By James Stradner",
  //             "naturalSize": {
  //               "naturalWidth": 811,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/james-2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/james-2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/james-2-thumbnail.jpg"
  //           },
  //           "jonas.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Staircase-participants",
  //             "displayMain": null,
  //             "themes": [
  //               "staircase",
  //               "social"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2015",
  //             "_id": "5e0898c312172c2514bdb699",
  //             "category": {
  //               "medium": {
  //                 "photo": []
  //               }
  //             },
  //             "filePath": "uploads/jonas.jpg",
  //             "fileName": "jonas.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": "By Jonas Lozoraitis",
  //             "naturalSize": {
  //               "naturalWidth": 808,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 2,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/jonas-desktop.jpg",
  //             "mobilePath": "uploads/mobile/jonas-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/jonas-thumbnail.jpg"
  //           },
  //           "jonas-2.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Staircase-participants",
  //             "displayMain": null,
  //             "themes": [
  //               "staircase",
  //               "social"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2015",
  //             "_id": "5e0898c312172c2514bdb69a",
  //             "category": {
  //               "medium": {
  //                 "photo": []
  //               }
  //             },
  //             "filePath": "uploads/jonas-2.jpg",
  //             "fileName": "jonas-2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 807,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 3,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/jonas-2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/jonas-2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/jonas-2-thumbnail.jpg"
  //           },
  //           "rowan-2.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Staircase-participants",
  //             "displayMain": null,
  //             "themes": [
  //               "staircase",
  //               "social"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2015",
  //             "_id": "5e0899d912172c2514bdb69b",
  //             "category": {
  //               "medium": {
  //                 "photo": []
  //               }
  //             },
  //             "filePath": "uploads/rowan-2.jpg",
  //             "fileName": "rowan-2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": "A still from a video by Rowan Wigley, featuring Rowan and her father collecting sticks. ",
  //             "naturalSize": {
  //               "naturalWidth": 713,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 4,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/rowan-2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/rowan-2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/rowan-2-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "alex.jpg",
  //             "james-2.jpg",
  //             "jonas.jpg",
  //             "jonas-2.jpg",
  //             "rowan-2.jpg"
  //           ],
  //           "id": "Staircase-participants-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Staircase-participants-relatedArtworks"
  //         ]
  //       },
  //       "Staircase-later": {
  //         "files": {
  //           "staircase-after-3.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "public"
  //               ],
  //               "subcategory": [
  //                 "other"
  //               ],
  //               "listitems": [],
  //               "themes": [
  //                 "staircase",
  //                 "social"
  //               ],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Staircase-later",
  //             "displayMain": true,
  //             "themes": [
  //               "staircase",
  //               "social"
  //             ],
  //             "seeAlso": [
  //               "staircase-2-0.jpg"
  //             ],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5e08865212172c2514bdb694",
  //             "category": {
  //               "public": {
  //                 "other": []
  //               }
  //             },
  //             "filePath": "uploads/staircase-after-3.jpg",
  //             "fileName": "staircase-after-3.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "I returned to the estate to look at the posters once again, found them stripped off walls leaving white sunfaded rectangles framed with dried dirty mop water.",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 607,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/staircase-after-3-desktop.jpg",
  //             "mobilePath": "uploads/mobile/staircase-after-3-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/staircase-after-3-thumbnail.jpg"
  //           },
  //           "staircase-after-2.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "public"
  //               ],
  //               "subcategory": [
  //                 "other"
  //               ],
  //               "listitems": [],
  //               "themes": [
  //                 "staircase",
  //                 "social"
  //               ],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Staircase-later",
  //             "displayMain": null,
  //             "themes": [
  //               "staircase",
  //               "social"
  //             ],
  //             "seeAlso": [
  //               "staircase-2-0.jpg"
  //             ],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5e08865212172c2514bdb695",
  //             "category": {
  //               "public": {
  //                 "other": []
  //               }
  //             },
  //             "filePath": "uploads/staircase-after-2.jpg",
  //             "fileName": "staircase-after-2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "I returned to the estate to look at the posters once again, found them stripped off walls leaving white sunfaded rectangles framed with dried dirty mop water.",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 607,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/staircase-after-2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/staircase-after-2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/staircase-after-2-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "staircase-after-3.jpg",
  //             "staircase-after-2.jpg"
  //           ],
  //           "id": "Staircase-later-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Staircase-later-relatedArtworks"
  //         ]
  //       },
  //       "Before eyes": {
  //         "files": {
  //           "before-eyes.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [
  //                 "painting"
  //               ],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "2017",
  //               "location": "Woolwich, London, UK"
  //             },
  //             "artworkFamily": "Before eyes",
  //             "displayMain": true,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "Woolwich, London, UK",
  //             "year": "2017",
  //             "_id": "5df6d2b0266b6a2cf4384b5c",
  //             "category": {
  //               "medium": {
  //                 "painting": []
  //               },
  //               "studio": {
  //                 "wip": []
  //               }
  //             },
  //             "filePath": "uploads/before-eyes.jpg",
  //             "fileName": "before-eyes.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": "",
  //             "artworkDescription": "Stitched dust protection sheet stretched on custom frame, various paints, ballpoint pen, soft pastel. ",
  //             "naturalSize": {
  //               "naturalWidth": 608,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/before-eyes-desktop.jpg",
  //             "mobilePath": "uploads/mobile/before-eyes-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/before-eyes-thumbnail.jpg"
  //           },
  //           "before-eyes-2.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Before eyes",
  //             "displayMain": null,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "Woolwich, London, UK",
  //             "year": "2017",
  //             "_id": "5e0a0c5b9ed2212d50717682",
  //             "category": {
  //               "medium": {
  //                 "painting": []
  //               },
  //               "studio": {
  //                 "wip": []
  //               }
  //             },
  //             "filePath": "uploads/before-eyes-2.jpg",
  //             "fileName": "before-eyes-2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 720,
  //               "naturalHeight": 961
  //             },
  //             "familyDisplayIndex": 2,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/before-eyes-2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/before-eyes-2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/before-eyes-2-thumbnail.jpg"
  //           },
  //           "before-eyes-3.jpeg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Before eyes",
  //             "displayMain": null,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "Woolwich, London, UK",
  //             "year": "2017",
  //             "_id": "5e0a0c5b9ed2212d50717683",
  //             "category": {
  //               "medium": {
  //                 "painting": []
  //               },
  //               "studio": {
  //                 "wip": []
  //               }
  //             },
  //             "filePath": "uploads/before-eyes-3.jpeg",
  //             "fileName": "before-eyes-3.jpeg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1440,
  //               "naturalHeight": 1920
  //             },
  //             "familyDisplayIndex": 3,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/before-eyes-3-desktop.jpeg",
  //             "mobilePath": "uploads/mobile/before-eyes-3-mob.jpeg",
  //             "thumbnailPath": "uploads/thumbnails/before-eyes-3-thumbnail.jpeg"
  //           },
  //           "before-eyes-1.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "studio"
  //               ],
  //               "subcategory": [
  //                 "wip",
  //                 "studio"
  //               ],
  //               "listitems": [
  //                 "progress"
  //               ],
  //               "themes": [],
  //               "year": "",
  //               "location": "Panevėžys, Lithuania"
  //             },
  //             "artworkFamily": "Before eyes",
  //             "displayMain": null,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2017",
  //             "_id": "5e0a0d569ed2212d50717685",
  //             "category": {
  //               "medium": {
  //                 "painting": []
  //               },
  //               "studio": {
  //                 "wip": [
  //                   "progress"
  //                 ],
  //                 "studio": []
  //               }
  //             },
  //             "filePath": "uploads/before-eyes-1.jpg",
  //             "fileName": "before-eyes-1.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 525,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/before-eyes-1-desktop.jpg",
  //             "mobilePath": "uploads/mobile/before-eyes-1-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/before-eyes-1-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "before-eyes.jpg",
  //             "before-eyes-1.jpg",
  //             "before-eyes-2.jpg",
  //             "before-eyes-3.jpeg"
  //           ],
  //           "id": "Before eyes-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Before eyes-relatedArtworks"
  //         ]
  //       },
  //       "Clay stand": {
  //         "files": {
  //           "ceramic-stand-3.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [
  //                 "sculpture"
  //               ],
  //               "listitems": [
  //                 "ceramics"
  //               ],
  //               "themes": [
  //                 "vessel"
  //               ],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Clay stand",
  //             "displayMain": true,
  //             "themes": [
  //               "vessel"
  //             ],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2019",
  //             "_id": "5e0a0fef9ed2212d5071768a",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "ceramics"
  //                 ]
  //               },
  //               "studio": {
  //                 "wip": []
  //               }
  //             },
  //             "filePath": "uploads/ceramic-stand-3.jpg",
  //             "fileName": "ceramic-stand-3.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "Initial design involved three recesses: \nfor flax seeds, for a wax apple and for up to two low denomination coins. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 525,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/ceramic-stand-3-desktop.jpg",
  //             "mobilePath": "uploads/mobile/ceramic-stand-3-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/ceramic-stand-3-thumbnail.jpg"
  //           },
  //           "ceramic-stand-2.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "studio"
  //               ],
  //               "subcategory": [
  //                 "wip"
  //               ],
  //               "listitems": [
  //                 "progress"
  //               ],
  //               "themes": [
  //                 "vessel"
  //               ],
  //               "year": "2019",
  //               "location": "Panevėžys, Lithuania"
  //             },
  //             "artworkFamily": "Clay stand",
  //             "displayMain": true,
  //             "themes": [
  //               "vessel"
  //             ],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2019",
  //             "_id": "5e0a0fef9ed2212d5071768b",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "ceramics"
  //                 ]
  //               },
  //               "studio": {
  //                 "wip": [
  //                   "progress"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/ceramic-stand-2.jpg",
  //             "fileName": "ceramic-stand-2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "Initial design involved three recesses: \nfor flax seeds, for a wax apple and for up to two low denomination coins. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1960,
  //               "naturalHeight": 2989
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/ceramic-stand-2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/ceramic-stand-2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/ceramic-stand-2-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "ceramic-stand-3.jpg",
  //             "ceramic-stand-2.jpg"
  //           ],
  //           "id": "Clay stand-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Clay stand-relatedArtworks"
  //         ]
  //       },
  //       "Kissing": {
  //         "files": {
  //           "kiss-2.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "studio"
  //               ],
  //               "subcategory": [
  //                 "wip",
  //                 "studio"
  //               ],
  //               "listitems": [
  //                 "other",
  //                 "progress"
  //               ],
  //               "themes": [
  //                 "connected spheres"
  //               ],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Kissing",
  //             "displayMain": null,
  //             "themes": [
  //               "connected spheres",
  //               "kiss"
  //             ],
  //             "seeAlso": [],
  //             "location": "Woolwich, London, UK",
  //             "year": "2017",
  //             "_id": "5e0a67d07d57c70eb872ee9b",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "other",
  //                   "plaster"
  //                 ]
  //               },
  //               "studio": {
  //                 "wip": [
  //                   "progress"
  //                 ],
  //                 "studio": []
  //               }
  //             },
  //             "filePath": "uploads/kiss-2.jpg",
  //             "fileName": "kiss-2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "Plaster, sand, baby oil. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 608,
  //               "naturalHeight": 916
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/kiss-2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/kiss-2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/kiss-2-thumbnail.jpg"
  //           },
  //           "kiss-0.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "sculpture"
  //               ],
  //               "listitems": [
  //                 "other",
  //                 "plaster"
  //               ],
  //               "themes": [
  //                 "connected spheres",
  //                 "kiss"
  //               ],
  //               "year": "2017",
  //               "location": "Woolwich, London, UK"
  //             },
  //             "artworkFamily": "Kissing",
  //             "displayMain": true,
  //             "themes": [
  //               "connected spheres",
  //               "kiss"
  //             ],
  //             "seeAlso": [
  //               "connectedSpheres2.jpg",
  //               "kiss4.jpg"
  //             ],
  //             "location": "Woolwich, London, UK",
  //             "year": "2017",
  //             "_id": "5e0a67d07d57c70eb872ee9c",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "other",
  //                   "plaster"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/kiss-0.jpg",
  //             "fileName": "kiss-0.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "Plaster, sand, baby oil. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 737,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/kiss-0-desktop.jpg",
  //             "mobilePath": "uploads/mobile/kiss-0-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/kiss-0-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "kiss-0.jpg",
  //             "kiss-2.jpg"
  //           ],
  //           "id": "Kissing-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Kissing-relatedArtworks"
  //         ]
  //       },
  //       "Woodblock": {
  //         "files": {
  //           "woodblock-1.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "sculpture"
  //               ],
  //               "listitems": [
  //                 "other"
  //               ],
  //               "themes": [],
  //               "year": "2014",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "Woodblock",
  //             "displayMain": true,
  //             "themes": [
  //               "acephale"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5e0a5f5b7d57c70eb872ee8e",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "other"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/woodblock-1.jpg",
  //             "fileName": "woodblock-1.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 720,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/woodblock-1-desktop.jpg",
  //             "mobilePath": "uploads/mobile/woodblock-1-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/woodblock-1-thumbnail.jpg"
  //           },
  //           "woodblock-2.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Woodblock",
  //             "displayMain": null,
  //             "themes": [
  //               "acephale"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5e0a5f5b7d57c70eb872ee8f",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "other"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/woodblock-2.jpg",
  //             "fileName": "woodblock-2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 720,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/woodblock-2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/woodblock-2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/woodblock-2-thumbnail.jpg"
  //           },
  //           "woodblock-4.JPG": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [
  //                 "misc"
  //               ],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Woodblock",
  //             "displayMain": null,
  //             "themes": [
  //               "acephale"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5e0a5f5b7d57c70eb872ee91",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "other"
  //                 ]
  //               },
  //               "studio": {
  //                 "misc": []
  //               }
  //             },
  //             "filePath": "uploads/woodblock-4.JPG",
  //             "fileName": "woodblock-4.JPG",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 3456,
  //               "naturalHeight": 5184
  //             },
  //             "familyDisplayIndex": 3,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/woodblock-4-desktop.JPG",
  //             "mobilePath": "uploads/mobile/woodblock-4-mob.JPG",
  //             "thumbnailPath": "uploads/thumbnails/woodblock-4-thumbnail.JPG"
  //           },
  //           "woodblock-3.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [
  //                 "acephale"
  //               ],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Woodblock",
  //             "displayMain": null,
  //             "themes": [
  //               "acephale"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5e0a5f5b7d57c70eb872ee90",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "other"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/woodblock-3.jpg",
  //             "fileName": "woodblock-3.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 3456,
  //               "naturalHeight": 5184
  //             },
  //             "familyDisplayIndex": 2,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/woodblock-3-desktop.jpg",
  //             "mobilePath": "uploads/mobile/woodblock-3-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/woodblock-3-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "woodblock-1.jpg",
  //             "woodblock-2.jpg",
  //             "woodblock-3.jpg",
  //             "woodblock-4.JPG"
  //           ],
  //           "id": "Woodblock-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Woodblock-relatedArtworks"
  //         ]
  //       },
  //       "Mirror shelf": {
  //         "files": {
  //           "mirror-shelf-2.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [
  //                 "studio"
  //               ],
  //               "listitems": [
  //                 "other"
  //               ],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Mirror shelf",
  //             "displayMain": null,
  //             "themes": [
  //               "furniture"
  //             ],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2019",
  //             "_id": "5e0a16369ed2212d50717696",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "other"
  //                 ]
  //               },
  //               "studio": {
  //                 "studio": []
  //               }
  //             },
  //             "filePath": "uploads/mirror-shelf-2.jpg",
  //             "fileName": "mirror-shelf-2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "A two part contraption devised to hold a mirror on a corner of a wall. Covered in synthetic purple satin and blue felt.",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 627,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/mirror-shelf-2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/mirror-shelf-2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/mirror-shelf-2-thumbnail.jpg"
  //           },
  //           "mirror-shelf-1.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "sculpture"
  //               ],
  //               "listitems": [
  //                 "other"
  //               ],
  //               "themes": [
  //                 "furniture"
  //               ],
  //               "year": "2019",
  //               "location": "Panevėžys, Lithuania"
  //             },
  //             "artworkFamily": "Mirror shelf",
  //             "displayMain": true,
  //             "themes": [
  //               "furniture"
  //             ],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2019",
  //             "_id": "5e0a16369ed2212d50717695",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "other"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/mirror-shelf-1.jpg",
  //             "fileName": "mirror-shelf-1.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "A two part contraption devised to hold a mirror on a corner of a wall. Covered in synthetic purple satin and blue felt.",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 555,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/mirror-shelf-1-desktop.jpg",
  //             "mobilePath": "uploads/mobile/mirror-shelf-1-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/mirror-shelf-1-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "mirror-shelf-1.jpg",
  //             "mirror-shelf-2.jpg"
  //           ],
  //           "id": "Mirror shelf-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Mirror shelf-relatedArtworks"
  //         ]
  //       },
  //       "Jozin print": {
  //         "files": {
  //           "jozin-4.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Jozin print",
  //             "displayMain": null,
  //             "themes": [
  //               "acephale",
  //               "tools"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5e0a64987d57c70eb872ee94",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "print material"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/jozin-4.jpg",
  //             "fileName": "jozin-4.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "A print on commercial banner, held to a wall with an excess of fixtures.",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 834,
  //               "naturalHeight": 552
  //             },
  //             "familyDisplayIndex": 3,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/jozin-4-desktop.jpg",
  //             "mobilePath": "uploads/mobile/jozin-4-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/jozin-4-thumbnail.jpg"
  //           },
  //           "jozin-1.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [
  //                 "print material",
  //                 "installation"
  //               ],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Jozin print",
  //             "displayMain": null,
  //             "themes": [
  //               "acephale",
  //               "tools"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5e0a64987d57c70eb872ee96",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "print material"
  //                 ],
  //                 "sculpture": [
  //                   "installation"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/jozin-1.jpg",
  //             "fileName": "jozin-1.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "A print on commercial banner, held to a wall with an excess of fixtures.",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1618,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 2,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/jozin-1-desktop.jpg",
  //             "mobilePath": "uploads/mobile/jozin-1-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/jozin-1-thumbnail.jpg"
  //           },
  //           "jozin-3.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "graphics"
  //               ],
  //               "listitems": [
  //                 "print material"
  //               ],
  //               "themes": [
  //                 "acephale"
  //               ],
  //               "year": "2014",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "Jozin print",
  //             "displayMain": true,
  //             "themes": [
  //               "acephale"
  //             ],
  //             "seeAlso": [
  //               "woodblock-3.jpg"
  //             ],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5e0a64987d57c70eb872ee98",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "print material"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/jozin-3.jpg",
  //             "fileName": "jozin-3.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "A print on commercial banner, held to a wall with an excess of fixtures.",
  //             "artworkTitle": null,
  //             "artworkDescription": "Two headless figures spinning in a circle, or greeting, or wrestling surrounded in fog. Scanned woodblock print.",
  //             "naturalSize": {
  //               "naturalWidth": 1553,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/jozin-3-desktop.jpg",
  //             "mobilePath": "uploads/mobile/jozin-3-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/jozin-3-thumbnail.jpg"
  //           },
  //           "jozin-2.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "photo"
  //               ],
  //               "listitems": [
  //                 "color"
  //               ],
  //               "themes": [],
  //               "year": "2014",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "Jozin print",
  //             "displayMain": true,
  //             "themes": [
  //               "acephale"
  //             ],
  //             "seeAlso": [
  //               "Untitled32.jpg"
  //             ],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5e0a64987d57c70eb872ee97",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "print material"
  //                 ],
  //                 "photo": [
  //                   "color"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/jozin-2.jpg",
  //             "fileName": "jozin-2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "A print on commercial banner, held to a wall with an excess of fixtures.",
  //             "artworkTitle": null,
  //             "artworkDescription": "A portrait of me crawling out of a pond in a park in London, smiling as if cheering on the scenario on the right.",
  //             "naturalSize": {
  //               "naturalWidth": 1688,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/jozin-2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/jozin-2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/jozin-2-thumbnail.jpg"
  //           },
  //           "jozin-5.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [
  //                 "tools",
  //                 "metal",
  //                 "support"
  //               ],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Jozin print",
  //             "displayMain": null,
  //             "themes": [
  //               "acephale",
  //               "tools",
  //               "metal",
  //               "support"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2014",
  //             "_id": "5e0a64987d57c70eb872ee95",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "print material"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/jozin-5.jpg",
  //             "fileName": "jozin-5.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "A print on commercial banner, held to a wall with an excess of fixtures.",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 711,
  //               "naturalHeight": 853
  //             },
  //             "familyDisplayIndex": 4,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/jozin-5-desktop.jpg",
  //             "mobilePath": "uploads/mobile/jozin-5-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/jozin-5-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "jozin-2.jpg",
  //             "jozin-3.jpg",
  //             "jozin-1.jpg",
  //             "jozin-4.jpg",
  //             "jozin-5.jpg"
  //           ],
  //           "id": "Jozin print-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Jozin print-relatedArtworks"
  //         ]
  //       },
  //       "Foot with a handle": {
  //         "files": {
  //           "foot-with-handle-5.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Foot with a handle",
  //             "displayMain": null,
  //             "themes": [
  //               "tools"
  //             ],
  //             "seeAlso": [
  //               "chicken_leg_2.jpg",
  //               "kolona.jpg"
  //             ],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2018",
  //             "_id": "5e0a137d9ed2212d50717690",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "ceramics",
  //                   "plaster"
  //                 ]
  //               },
  //               "studio": {
  //                 "wip": []
  //               }
  //             },
  //             "filePath": "uploads/foot-with-handle-5.jpg",
  //             "fileName": "foot-with-handle-5.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "A clay or plaster (cast) foot propped on various furniture handles. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1080,
  //               "naturalHeight": 608
  //             },
  //             "familyDisplayIndex": 2,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/foot-with-handle-5-desktop.jpg",
  //             "mobilePath": "uploads/mobile/foot-with-handle-5-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/foot-with-handle-5-thumbnail.jpg"
  //           },
  //           "foot-with-handle-1.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "studio"
  //               ],
  //               "subcategory": [
  //                 "wip"
  //               ],
  //               "listitems": [
  //                 "plaster"
  //               ],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Foot with a handle",
  //             "displayMain": false,
  //             "themes": [
  //               "tools"
  //             ],
  //             "seeAlso": [
  //               "chicken_leg_2.jpg",
  //               "kolona.jpg"
  //             ],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2018",
  //             "_id": "5e0a137d9ed2212d50717692",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "ceramics",
  //                   "plaster"
  //                 ]
  //               },
  //               "studio": {
  //                 "wip": []
  //               }
  //             },
  //             "filePath": "uploads/foot-with-handle-1.jpg",
  //             "fileName": "foot-with-handle-1.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "A clay or plaster (cast) foot propped on various furniture handles. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 608,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/foot-with-handle-1-desktop.jpg",
  //             "mobilePath": "uploads/mobile/foot-with-handle-1-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/foot-with-handle-1-thumbnail.jpg"
  //           },
  //           "foot-with-handle-2.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [
  //                 "sculpture"
  //               ],
  //               "listitems": [
  //                 "ceramics",
  //                 "plaster"
  //               ],
  //               "themes": [
  //                 "tools"
  //               ],
  //               "year": "2018",
  //               "location": "Panevėžys, Lithuania"
  //             },
  //             "artworkFamily": "Foot with a handle",
  //             "displayMain": true,
  //             "themes": [
  //               "tools"
  //             ],
  //             "seeAlso": [
  //               "chicken_leg_2.jpg",
  //               "kolona.jpg"
  //             ],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2018",
  //             "_id": "5e0a137d9ed2212d50717693",
  //             "category": {
  //               "medium": {
  //                 "sculpture": [
  //                   "ceramics",
  //                   "plaster"
  //                 ]
  //               },
  //               "studio": {
  //                 "wip": []
  //               }
  //             },
  //             "filePath": "uploads/foot-with-handle-2.jpg",
  //             "fileName": "foot-with-handle-2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "A clay or plaster (cast) foot propped on various furniture handles. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1459,
  //               "naturalHeight": 2593
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/foot-with-handle-2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/foot-with-handle-2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/foot-with-handle-2-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "foot-with-handle-2.jpg",
  //             "foot-with-handle-1.jpg",
  //             "foot-with-handle-5.jpg"
  //           ],
  //           "id": "Foot with a handle-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Foot with a handle-relatedArtworks"
  //         ]
  //       },
  //       "Vignette": {
  //         "files": {
  //           "vignette-2.png": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [
  //                 "graphics"
  //               ],
  //               "listitems": [
  //                 "cg"
  //               ],
  //               "themes": [
  //                 "social"
  //               ],
  //               "year": "2016",
  //               "location": "Panevėžys, Lithuania"
  //             },
  //             "artworkFamily": "Vignette",
  //             "displayMain": false,
  //             "themes": [
  //               "social"
  //             ],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2016",
  //             "_id": "5e0e5504208f711970b73976",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "cg"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/vignette-2.png",
  //             "fileName": "vignette-2.png",
  //             "fileType": "image/png",
  //             "familyDescription": "Digital collages put together for a show Darai ką turi daryti (You gotta do what you gotta do). Ended up not being used in the exhibition. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1080,
  //               "naturalHeight": 763
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/vignette-2-desktop.png",
  //             "mobilePath": "uploads/mobile/vignette-2-mob.png",
  //             "thumbnailPath": "uploads/thumbnails/vignette-2-thumbnail.png"
  //           },
  //           "vignette1.png": {
  //             "displayTriggers": {
  //               "category": [
  //                 "studio"
  //               ],
  //               "subcategory": [
  //                 "misc"
  //               ],
  //               "listitems": [],
  //               "themes": [
  //                 "social",
  //                 "cards"
  //               ],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Vignette",
  //             "displayMain": null,
  //             "themes": [
  //               "social",
  //               "cards"
  //             ],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2016",
  //             "_id": "5e0e5504208f711970b73978",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "cg"
  //                 ]
  //               },
  //               "studio": {
  //                 "misc": []
  //               }
  //             },
  //             "filePath": "uploads/vignette1.png",
  //             "fileName": "vignette1.png",
  //             "fileType": "image/png",
  //             "familyDescription": "Digital collages put together for a show Darai ką turi daryti (You gotta do what you gotta do). Ended up not being used in the exhibition. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 3508,
  //               "naturalHeight": 2480
  //             },
  //             "familyDisplayIndex": 2,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/vignette1-desktop.png",
  //             "mobilePath": "uploads/mobile/vignette1-mob.png",
  //             "thumbnailPath": "uploads/thumbnails/vignette1-thumbnail.png"
  //           },
  //           "vignette-3.png": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Vignette",
  //             "displayMain": null,
  //             "themes": [
  //               "social"
  //             ],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2016",
  //             "_id": "5e0e5504208f711970b73977",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "cg"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/vignette-3.png",
  //             "fileName": "vignette-3.png",
  //             "fileType": "image/png",
  //             "familyDescription": "Digital collages put together for a show Darai ką turi daryti (You gotta do what you gotta do). Ended up not being used in the exhibition. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1080,
  //               "naturalHeight": 763
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/vignette-3-desktop.png",
  //             "mobilePath": "uploads/mobile/vignette-3-mob.png",
  //             "thumbnailPath": "uploads/thumbnails/vignette-3-thumbnail.png"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "vignette-2.png",
  //             "vignette-3.png",
  //             "vignette1.png"
  //           ],
  //           "id": "Vignette-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Vignette-relatedArtworks"
  //         ]
  //       },
  //       "Sundown": {
  //         "files": {
  //           "sundown.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "graphics"
  //               ],
  //               "listitems": [
  //                 "cg"
  //               ],
  //               "themes": [
  //                 "weather",
  //                 "celestial body",
  //                 "acephale",
  //                 "days"
  //               ],
  //               "year": "2019",
  //               "location": "Panevėžys, Lithuania"
  //             },
  //             "artworkFamily": "Sundown",
  //             "displayMain": true,
  //             "themes": [
  //               "weather",
  //               "celestial body",
  //               "acephale",
  //               "days"
  //             ],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2019",
  //             "_id": "5e0e6b85208f711970b73984",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "cg"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/sundown.jpg",
  //             "fileName": "sundown.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "A female figure facing the setting sun by sea. ",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 595,
  //               "naturalHeight": 338
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/sundown-desktop.jpg",
  //             "mobilePath": "uploads/mobile/sundown-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/sundown-thumbnail.jpg"
  //           },
  //           "20190418_143219-2.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "studio"
  //               ],
  //               "subcategory": [],
  //               "listitems": [
  //                 "cg",
  //                 "progress"
  //               ],
  //               "themes": [],
  //               "year": "2019",
  //               "location": "Panevėžys, Lithuania"
  //             },
  //             "artworkFamily": "Sundown",
  //             "displayMain": null,
  //             "themes": [
  //               "weather",
  //               "celestial body",
  //               "acephale"
  //             ],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2019",
  //             "_id": "5e0e6c9a208f711970b73986",
  //             "category": {
  //               "medium": {
  //                 "graphics": [
  //                   "cg"
  //                 ]
  //               },
  //               "studio": {
  //                 "wip": [
  //                   "progress"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/20190418_143219-2.jpg",
  //             "fileName": "20190418_143219-2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "A female figure facing the setting sun by sea. ",
  //             "artworkTitle": null,
  //             "artworkDescription": "A digital mockup of the image printed on paper and dyed with potassium permanganate. ",
  //             "naturalSize": {
  //               "naturalWidth": 1170,
  //               "naturalHeight": 720
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/20190418_143219-2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/20190418_143219-2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/20190418_143219-2-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "sundown.jpg",
  //             "20190418_143219-2.jpg"
  //           ],
  //           "id": "Sundown-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Sundown-relatedArtworks"
  //         ]
  //       },
  //       "Shy photographs": {
  //         "files": {
  //           "shy-photos-1.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Shy photographs",
  //             "displayMain": null,
  //             "themes": [
  //               "social"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2015",
  //             "_id": "5e0e51d9208f711970b73970",
  //             "category": {
  //               "medium": {
  //                 "photo": [
  //                   "color"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/shy-photos-1.jpg",
  //             "fileName": "shy-photos-1.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "I intended to take pictures of people in crowds, but felt self-conscious pointing my camera at faces so images are out of focus and shaky. Taken on a double decker bus around Oxford Circus in London, UK.",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1080,
  //               "naturalHeight": 810
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/shy-photos-1-desktop.jpg",
  //             "mobilePath": "uploads/mobile/shy-photos-1-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/shy-photos-1-thumbnail.jpg"
  //           },
  //           "shy-photos-3.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "photo"
  //               ],
  //               "listitems": [
  //                 "color"
  //               ],
  //               "themes": [
  //                 "social"
  //               ],
  //               "year": "2015",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "Shy photographs",
  //             "displayMain": true,
  //             "themes": [
  //               "social"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2015",
  //             "_id": "5e0e51d9208f711970b73972",
  //             "category": {
  //               "medium": {
  //                 "photo": [
  //                   "color"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/shy-photos-3.jpg",
  //             "fileName": "shy-photos-3.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "I intended to take pictures of people in crowds, but felt self-conscious pointing my camera at faces so images are out of focus and shaky. Taken on a double decker bus around Oxford Circus in London, UK.",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1080,
  //               "naturalHeight": 810
  //             },
  //             "familyDisplayIndex": 2,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/shy-photos-3-desktop.jpg",
  //             "mobilePath": "uploads/mobile/shy-photos-3-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/shy-photos-3-thumbnail.jpg"
  //           },
  //           "shy-photos-5.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Shy photographs",
  //             "displayMain": null,
  //             "themes": [
  //               "social"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2015",
  //             "_id": "5e0e51d9208f711970b73974",
  //             "category": {
  //               "medium": {
  //                 "photo": [
  //                   "color"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/shy-photos-5.jpg",
  //             "fileName": "shy-photos-5.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "I intended to take pictures of people in crowds, but felt self-conscious pointing my camera at faces so images are out of focus and shaky. Taken on a double decker bus around Oxford Circus in London, UK.",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1080,
  //               "naturalHeight": 810
  //             },
  //             "familyDisplayIndex": 4,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/shy-photos-5-desktop.jpg",
  //             "mobilePath": "uploads/mobile/shy-photos-5-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/shy-photos-5-thumbnail.jpg"
  //           },
  //           "shy-photos-2.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium"
  //               ],
  //               "subcategory": [
  //                 "photo"
  //               ],
  //               "listitems": [
  //                 "color"
  //               ],
  //               "themes": [
  //                 "social"
  //               ],
  //               "year": "2015",
  //               "location": "London, UK"
  //             },
  //             "artworkFamily": "Shy photographs",
  //             "displayMain": null,
  //             "themes": [
  //               "social"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2015",
  //             "_id": "5e0e51d9208f711970b73971",
  //             "category": {
  //               "medium": {
  //                 "photo": [
  //                   "color"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/shy-photos-2.jpg",
  //             "fileName": "shy-photos-2.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "I intended to take pictures of people in crowds, but felt self-conscious pointing my camera at faces so images are out of focus and shaky. Taken on a double decker bus around Oxford Circus in London, UK.",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1080,
  //               "naturalHeight": 810
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/shy-photos-2-desktop.jpg",
  //             "mobilePath": "uploads/mobile/shy-photos-2-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/shy-photos-2-thumbnail.jpg"
  //           },
  //           "shy-photos-4.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "Shy photographs",
  //             "displayMain": null,
  //             "themes": [
  //               "social"
  //             ],
  //             "seeAlso": [],
  //             "location": "London, UK",
  //             "year": "2015",
  //             "_id": "5e0e51d9208f711970b73973",
  //             "category": {
  //               "medium": {
  //                 "photo": [
  //                   "color"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/shy-photos-4.jpg",
  //             "fileName": "shy-photos-4.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "I intended to take pictures of people in crowds, but felt self-conscious pointing my camera at faces so images are out of focus and shaky. Taken on a double decker bus around Oxford Circus in London, UK.",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1080,
  //               "naturalHeight": 810
  //             },
  //             "familyDisplayIndex": 3,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/shy-photos-4-desktop.jpg",
  //             "mobilePath": "uploads/mobile/shy-photos-4-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/shy-photos-4-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "shy-photos-1.jpg",
  //             "shy-photos-2.jpg",
  //             "shy-photos-3.jpg",
  //             "shy-photos-4.jpg",
  //             "shy-photos-5.jpg"
  //           ],
  //           "id": "Shy photographs-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "Shy photographs-relatedArtworks"
  //         ]
  //       },
  //       "You gotta do what you gotta do": {
  //         "files": {
  //           "youdo2-3.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "You gotta do what you gotta do",
  //             "displayMain": null,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2016",
  //             "_id": "5e0e6296208f711970b7397a",
  //             "category": {
  //               "public": {
  //                 "exhibitions": [
  //                   "gotta do"
  //                 ]
  //               },
  //               "medium": {
  //                 "graphics": [
  //                   "print material"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/youdo2-3.jpg",
  //             "fileName": "youdo2-3.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "An exhibition I put together with two of my friends (Jacob Bates-Firth and Sophia Freeman), taking personal materials we shared with each other over social networks and sticking them up on walls with tape or displaying them as videos on screens. \n\nhttps://daraikaturidaryti.tumblr.com/",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1924,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 6,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/youdo2-3-desktop.jpg",
  //             "mobilePath": "uploads/mobile/youdo2-3-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/youdo2-3-thumbnail.jpg"
  //           },
  //           "youdo1.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "public"
  //               ],
  //               "subcategory": [
  //                 "exhibitions"
  //               ],
  //               "listitems": [
  //                 "gotta do",
  //                 "print material"
  //               ],
  //               "themes": [],
  //               "year": "2016",
  //               "location": "Panevėžys, Lithuania"
  //             },
  //             "artworkFamily": "You gotta do what you gotta do",
  //             "displayMain": true,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2016",
  //             "_id": "5e0e6296208f711970b7397b",
  //             "category": {
  //               "public": {
  //                 "exhibitions": [
  //                   "gotta do"
  //                 ]
  //               },
  //               "medium": {
  //                 "graphics": [
  //                   "print material"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/youdo1.jpg",
  //             "fileName": "youdo1.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "An exhibition I put together with two of my friends (Jacob Bates-Firth and Sophia Freeman), taking personal materials we shared with each other over social networks and sticking them up on walls with tape or displaying them as videos on screens. \n\nhttps://daraikaturidaryti.tumblr.com/",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1440,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 0,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/youdo1-desktop.jpg",
  //             "mobilePath": "uploads/mobile/youdo1-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/youdo1-thumbnail.jpg"
  //           },
  //           "youdo9-1.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "You gotta do what you gotta do",
  //             "displayMain": true,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2016",
  //             "_id": "5e0e6297208f711970b7397f",
  //             "category": {
  //               "public": {
  //                 "exhibitions": [
  //                   "gotta do"
  //                 ]
  //               },
  //               "medium": {
  //                 "graphics": [
  //                   "print material"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/youdo9-1.jpg",
  //             "fileName": "youdo9-1.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "An exhibition I put together with two of my friends (Jacob Bates-Firth and Sophia Freeman), taking personal materials we shared with each other over social networks and sticking them up on walls with tape or displaying them as videos on screens. \n\nhttps://daraikaturidaryti.tumblr.com/",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1440,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 5,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/youdo9-1-desktop.jpg",
  //             "mobilePath": "uploads/mobile/youdo9-1-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/youdo9-1-thumbnail.jpg"
  //           },
  //           "youdo4-0.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "public"
  //               ],
  //               "subcategory": [
  //                 "exhibitions"
  //               ],
  //               "listitems": [
  //                 "gotta do"
  //               ],
  //               "themes": [],
  //               "year": "2016",
  //               "location": "Panevėžys, Lithuania"
  //             },
  //             "artworkFamily": "You gotta do what you gotta do",
  //             "displayMain": null,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2016",
  //             "_id": "5e0e6297208f711970b7397c",
  //             "category": {
  //               "public": {
  //                 "exhibitions": [
  //                   "gotta do"
  //                 ]
  //               },
  //               "medium": {
  //                 "graphics": [
  //                   "print material"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/youdo4-0.jpg",
  //             "fileName": "youdo4-0.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "An exhibition I put together with two of my friends (Jacob Bates-Firth and Sophia Freeman), taking personal materials we shared with each other over social networks and sticking them up on walls with tape or displaying them as videos on screens. \n\nhttps://daraikaturidaryti.tumblr.com/",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1620,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 2,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/youdo4-0-desktop.jpg",
  //             "mobilePath": "uploads/mobile/youdo4-0-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/youdo4-0-thumbnail.jpg"
  //           },
  //           "youdo9-0.jpg": {
  //             "displayTriggers": {
  //               "category": [
  //                 "medium",
  //                 "public"
  //               ],
  //               "subcategory": [
  //                 "graphics"
  //               ],
  //               "listitems": [
  //                 "print material",
  //                 "gotta do"
  //               ],
  //               "themes": [],
  //               "year": "2016",
  //               "location": "Panevėžys, Lithuania"
  //             },
  //             "artworkFamily": "You gotta do what you gotta do",
  //             "displayMain": null,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2016",
  //             "_id": "5e0e6297208f711970b7397d",
  //             "category": {
  //               "public": {
  //                 "exhibitions": [
  //                   "gotta do"
  //                 ]
  //               },
  //               "medium": {
  //                 "graphics": [
  //                   "print material"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/youdo9-0.jpg",
  //             "fileName": "youdo9-0.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "An exhibition I put together with two of my friends (Jacob Bates-Firth and Sophia Freeman), taking personal materials we shared with each other over social networks and sticking them up on walls with tape or displaying them as videos on screens. \n\nhttps://daraikaturidaryti.tumblr.com/",
  //             "artworkTitle": null,
  //             "artworkDescription": "Poster to the show.",
  //             "naturalSize": {
  //               "naturalWidth": 1528,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 4,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/youdo9-0-desktop.jpg",
  //             "mobilePath": "uploads/mobile/youdo9-0-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/youdo9-0-thumbnail.jpg"
  //           },
  //           "youdo2-0.JPG": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "You gotta do what you gotta do",
  //             "displayMain": null,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2016",
  //             "_id": "5e0e6297208f711970b73981",
  //             "category": {
  //               "public": {
  //                 "exhibitions": [
  //                   "gotta do"
  //                 ]
  //               },
  //               "medium": {
  //                 "graphics": [
  //                   "print material"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/youdo2-0.JPG",
  //             "fileName": "youdo2-0.JPG",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "An exhibition I put together with two of my friends (Jacob Bates-Firth and Sophia Freeman), taking personal materials we shared with each other over social networks and sticking them up on walls with tape or displaying them as videos on screens. \n\nhttps://daraikaturidaryti.tumblr.com/",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 4288,
  //               "naturalHeight": 3216
  //             },
  //             "familyDisplayIndex": 1,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/youdo2-0-desktop.JPG",
  //             "mobilePath": "uploads/mobile/youdo2-0-mob.JPG",
  //             "thumbnailPath": "uploads/thumbnails/youdo2-0-thumbnail.JPG"
  //           },
  //           "youdo5.jpg": {
  //             "displayTriggers": {
  //               "category": [],
  //               "subcategory": [],
  //               "listitems": [],
  //               "themes": [],
  //               "year": "",
  //               "location": ""
  //             },
  //             "artworkFamily": "You gotta do what you gotta do",
  //             "displayMain": null,
  //             "themes": [],
  //             "seeAlso": [],
  //             "location": "Panevėžys, Lithuania",
  //             "year": "2016",
  //             "_id": "5e0e6297208f711970b73980",
  //             "category": {
  //               "public": {
  //                 "exhibitions": [
  //                   "gotta do"
  //                 ]
  //               },
  //               "medium": {
  //                 "graphics": [
  //                   "print material"
  //                 ]
  //               }
  //             },
  //             "filePath": "uploads/youdo5.jpg",
  //             "fileName": "youdo5.jpg",
  //             "fileType": "image/jpeg",
  //             "familyDescription": "An exhibition I put together with two of my friends (Jacob Bates-Firth and Sophia Freeman), taking personal materials we shared with each other over social networks and sticking them up on walls with tape or displaying them as videos on screens. \n\nhttps://daraikaturidaryti.tumblr.com/",
  //             "artworkTitle": null,
  //             "artworkDescription": null,
  //             "naturalSize": {
  //               "naturalWidth": 1620,
  //               "naturalHeight": 1080
  //             },
  //             "familyDisplayIndex": 3,
  //             "__v": 0,
  //             "desktopPath": "uploads/desktop/youdo5-desktop.jpg",
  //             "mobilePath": "uploads/mobile/youdo5-mob.jpg",
  //             "thumbnailPath": "uploads/thumbnails/youdo5-thumbnail.jpg"
  //           }
  //         },
  //         "column": {
  //           "fileIds": [
  //             "youdo1.jpg",
  //             "youdo2-0.JPG",
  //             "youdo4-0.jpg",
  //             "youdo5.jpg",
  //             "youdo9-0.jpg",
  //             "youdo9-1.jpg",
  //             "youdo2-3.jpg"
  //           ],
  //           "id": "You gotta do what you gotta do-relatedArtworks"
  //         },
  //         "columnOrder": [
  //           "You gotta do what you gotta do-relatedArtworks"
  //         ]
  //       }
  //     },
  //     "showModal": false,
  //     // "serverData": {
  //     //   "data": [
  //     //     "07022012710.jpg",
  //     //     "20170424_224934.jpg",
  //     //     "20170723_120614.jpg",
  //     //     "20170926_184020.jpg",
  //     //     "20190418_143219-2.jpg",
  //     //     "20191106_075914.jpg",
  //     //     "241.jpg",
  //     //     "65710021.JPG",
  //     //     "alex.jpg",
  //     //     "apple-pig-close-up.jpg",
  //     //     "ash-and-chip.jpg",
  //     //     "assemblage_2.jpg",
  //     //     "assemblage_4.jpg",
  //     //     "before-eyes-1.jpg",
  //     //     "before-eyes-2.jpg",
  //     //     "before-eyes-3.jpeg",
  //     //     "before-eyes.jpg",
  //     //     "bench-3.jpg",
  //     //     "bench-public-1.jpg",
  //     //     "bench-public-2.png",
  //     //     "bench1.jpg",
  //     //     "bench2.jpg",
  //     //     "blue-frame-1.jpg",
  //     //     "blue-frame-2.jpg",
  //     //     "buddy.jpg",
  //     //     "buried-in-meat-2.jpg",
  //     //     "ceramic-stand-2.jpg",
  //     //     "ceramic-stand-3.jpg",
  //     //     "char-creation-1.jpg",
  //     //     "char-creation-2.jpg",
  //     //     "cherry1.jpg",
  //     //     "cherry2.jpg",
  //     //     "chicken_leg_1.jpg",
  //     //     "chicken_leg_2.jpg",
  //     //     "chicken_leg_wip_1.jpg",
  //     //     "chicken_leg_wip_2.jpg",
  //     //     "chips-and-ash-on-snow.jpg",
  //     //     "chips3.jpg",
  //     //     "connectedSpheres1.jpg",
  //     //     "connectedSpheres2.jpg",
  //     //     "crescentBoxing.jpg",
  //     //     "days2.jpg",
  //     //     "desktop",
  //     //     "detail_testciles_2.jpg",
  //     //     "DSC_7228.jpg",
  //     //     "emo-sky.jpg",
  //     //     "fontanas_3.jpg",
  //     //     "foot-with-handle-1.jpg",
  //     //     "foot-with-handle-2.jpg",
  //     //     "foot-with-handle-4.jpg",
  //     //     "foot-with-handle-5.jpg",
  //     //     "ghost_1.jpg",
  //     //     "ghost_2.jpg",
  //     //     "ghost_3.jpg",
  //     //     "gradient0.jpg",
  //     //     "gradient2.jpg",
  //     //     "gradient5.jpg",
  //     //     "gradient6.jpg",
  //     //     "gradient7.jpg",
  //     //     "hammerScrew.jpg",
  //     //     "hunter-half-life-2-episode-3.jpg",
  //     //     "james-2.jpg",
  //     //     "james_print_1.jpg",
  //     //     "james_print_2.jpg",
  //     //     "jonas-2.jpg",
  //     //     "jonas.jpg",
  //     //     "jozin-1.jpg",
  //     //     "jozin-2.jpg",
  //     //     "jozin-3.jpg",
  //     //     "jozin-4.jpg",
  //     //     "jozin-5.jpg",
  //     //     "kiss-0.jpg",
  //     //     "kiss-2.jpg",
  //     //     "kiss-3.jpg",
  //     //     "kiss4.jpg",
  //     //     "kolona.jpg",
  //     //     "malonioji_1.jpg",
  //     //     "malonioji_2.jpg",
  //     //     "malonioji_3.jpg",
  //     //     "malonioji_4.jpg",
  //     //     "marker-and-ballpoint.jpg",
  //     //     "mirror-shelf-1.jpg",
  //     //     "mirror-shelf-2.jpg",
  //     //     "mobile",
  //     //     "mushroom-strawberry.jpg",
  //     //     "north_1.jpg",
  //     //     "north_2.jpg",
  //     //     "north_3.jpg",
  //     //     "person-on-bridge.png",
  //     //     "portrait.jpg",
  //     //     "red-frame.jpg",
  //     //     "rowan-2.jpg",
  //     //     "shitty-day.jpg",
  //     //     "shy-photos-1.jpg",
  //     //     "shy-photos-2.jpg",
  //     //     "shy-photos-3.jpg",
  //     //     "shy-photos-4.jpg",
  //     //     "shy-photos-5.jpg",
  //     //     "siaudu_batai_1.jpg",
  //     //     "siaudu_batai_2.jpg",
  //     //     "stage_kieme_1.jpg",
  //     //     "stage_kieme_2.jpg",
  //     //     "staircase-2-0.jpg",
  //     //     "staircase-2-00.jpg",
  //     //     "staircase-2-000.jpg",
  //     //     "staircase-2-1.jpg",
  //     //     "staircase-2-3.jpg",
  //     //     "staircase-2-4.jpg",
  //     //     "staircase-after-1.jpg",
  //     //     "staircase-after-2.jpg",
  //     //     "staircase-after-3.jpg",
  //     //     "star_1.jpg",
  //     //     "star_3.jpg",
  //     //     "star_4.jpg",
  //     //     "star_5.jpg",
  //     //     "star_7.jpg",
  //     //     "strawberry-forcefield.jpg",
  //     //     "sundown.jpg",
  //     //     "thumbnails",
  //     //     "trampled.jpg",
  //     //     "tumblr_m1rb2rhvez1rsi2gco2_1280.jpg",
  //     //     "tumblr_m1rb2rhvez1rsi2gco3_1280.jpg",
  //     //     "Untitled24.jpg",
  //     //     "Untitled27.jpg",
  //     //     "Untitled31.jpg",
  //     //     "Untitled32.jpg",
  //     //     "Untitled42.jpg",
  //     //     "Untitled54.jpg",
  //     //     "upe5.jpg",
  //     //     "upe6.jpg",
  //     //     "velniai_1.jpg",
  //     //     "velniai_2.jpg",
  //     //     "velniai_wip.jpg",
  //     //     "vignette-2.png",
  //     //     "vignette-3.png",
  //     //     "vignette1.png",
  //     //     "wizard-and-his-scholar.jpg",
  //     //     "woodblock-1.jpg",
  //     //     "woodblock-2.jpg",
  //     //     "woodblock-3.jpg",
  //     //     "woodblock-4.JPG",
  //     //     "woodblock-5.jpg",
  //     //     "WP_20150806_004.jpg",
  //     //     "WP_20150806_007.jpg",
  //     //     "WP_20180421_18_00_14_Pro.jpg",
  //     //     "WP_20180421_18_00_35_Pro.jpg",
  //     //     "youdo1.jpg",
  //     //     "youdo2-0.JPG",
  //     //     "youdo2-3.jpg",
  //     //     "youdo4-0.jpg",
  //     //     "youdo5.jpg",
  //     //     "youdo6.jpg",
  //     //     "youdo8-0.JPG",
  //     //     "youdo9-0.jpg",
  //     //     "youdo9-1.jpg"
  //     //   ],
  //     //   "status": 200,
  //     //   "statusText": "OK",
  //     //   "headers": {
  //     //     "connection": "close",
  //     //     "content-encoding": "gzip",
  //     //     "content-type": "application/json; charset=utf-8",
  //     //     "date": "Mon, 27 Jan 2020 18:27:34 GMT",
  //     //     "etag": "W/\"b1b-8CJxrfSLoAz+65qxlriQNwgjW1A\"",
  //     //     "transfer-encoding": "chunked",
  //     //     "vary": "Accept-Encoding",
  //     //     "x-powered-by": "Express"
  //     //   },
  //     //   "config": {
  //     //     "url": "/fetchimages",
  //     //     "method": "get",
  //     //     "headers": {
  //     //       "Accept": "application/json, text/plain, */*"
  //     //     },
  //     //     "transformRequest": [
  //     //       null
  //     //     ],
  //     //     "transformResponse": [
  //     //       null
  //     //     ],
  //     //     "timeout": 0,
  //     //     "xsrfCookieName": "XSRF-TOKEN",
  //     //     "xsrfHeaderName": "X-XSRF-TOKEN",
  //     //     "maxContentLength": -1
  //     //   },
  //     //   "request": {}
  //     // },
  //     // "artworkFamilyList": [
  //     //   "gradient_acephale",
  //     //   "Cherry",
  //     //   "Galaxy Watch",
  //     //   "none",
  //     //   "Apple pig",
  //     //   "about",
  //     //   "acephale_gradient",
  //     //   "Hammer screw",
  //     //   "Connected spheres",
  //     //   "Chips and ash on snow",
  //     //   "Bench",
  //     //   "Days",
  //     //   "Red frame",
  //     //   "velniai",
  //     //   "Chicken leg",
  //     //   "Garden scene",
  //     //   "Ghost",
  //     //   "Šiaudų batai",
  //     //   "Stage kieme",
  //     //   "Star",
  //     //   "Kolona",
  //     //   "James' print",
  //     //   "Lorenzo",
  //     //   "Beach service",
  //     //   "Pagalys",
  //     //   "Corridor",
  //     //   "Restaurant",
  //     //   "Poilsis",
  //     //   "_archive",
  //     //   "North aligned frame",
  //     //   "Staircase",
  //     //   "Staircase-later",
  //     //   "Staircase-participants",
  //     //   "Mushroom",
  //     //   "Before eyes",
  //     //   "Blue frame",
  //     //   "Clay stand",
  //     //   "Foot with a handle",
  //     //   "Mirror shelf",
  //     //   "Woodblock",
  //     //   "Jozin print",
  //     //   "Kissing",
  //     //   "Shy photographs",
  //     //   "Vignette",
  //     //   "You gotta do what you gotta do",
  //     //   "Sundown"
  //     // ],
  //     "categoriesData": [
  //       {
  //         "_id": "5d8915c01882d3254014395c",
  //         "category": "medium",
  //         "subcategory": {
  //           "graphics": [
  //             "print material",
  //             "drawing",
  //             "cg"
  //           ],
  //           "photo": [
  //             "color",
  //             "b/w"
  //           ],
  //           "painting": [],
  //           "sculpture": [
  //             "installation",
  //             "ceramics",
  //             "other",
  //             "plaster"
  //           ]
  //         },
  //         "__v": 0
  //       },
  //       {
  //         "_id": "5d89165a1882d3254014395d",
  //         "category": "public",
  //         "subcategory": {
  //           "other": [],
  //           "exhibitions": [
  //             "malonioji",
  //             "gotta do"
  //           ]
  //         },
  //         "__v": 0
  //       },
  //       {
  //         "_id": "5d89f971ca805850a4d9692a",
  //         "category": "studio",
  //         "subcategory": {
  //           "wip": [
  //             "sketches",
  //             "progress"
  //           ],
  //           "studio": [],
  //           "misc": []
  //         },
  //         "__v": 0
  //       }
  //     ],
  //     // "categoriesOptionList": {
  //     //   "data": {
  //     //     "medium": [
  //     //       "graphics",
  //     //       "photo",
  //     //       "painting",
  //     //       "sculpture"
  //     //     ],
  //     //     "public": [
  //     //       "other",
  //     //       "exhibitions"
  //     //     ],
  //     //     "studio": [
  //     //       "wip",
  //     //       "studio",
  //     //       "misc"
  //     //     ]
  //     //   }
  //     // },
  //     "artworkInfoData": {
  //       "07022012710.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "_archive",
  //         "displayMain": false,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "",
  //         "year": "",
  //         "_id": "5dfa7e04061ab618f4ee6beb",
  //         "category": {
  //           "studio": {
  //             "misc": []
  //           }
  //         },
  //         "filePath": "uploads/07022012710.jpg",
  //         "fileName": "07022012710.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1440,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 8,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/07022012710-desktop.jpg",
  //         "mobilePath": "uploads/mobile/07022012710-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/07022012710-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "20170424_224934.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "painting"
  //           ],
  //           "listitems": [],
  //           "themes": [],
  //           "year": null,
  //           "location": null
  //         },
  //         "artworkFamily": "Red frame",
  //         "displayMain": null,
  //         "themes": [],
  //         "seeAlso": [
  //           "malonioji_3.jpg"
  //         ],
  //         "location": null,
  //         "year": null,
  //         "_id": "5dfdfe47e7c9572b24e752a6",
  //         "category": {
  //           "medium": {
  //             "painting": []
  //           }
  //         },
  //         "filePath": "uploads/20170424_224934.jpg",
  //         "fileName": "20170424_224934.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1229,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/20170424_224934-desktop.jpg",
  //         "mobilePath": "uploads/mobile/20170424_224934-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/20170424_224934-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "20170723_120614.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "studio",
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "wip",
  //             "graphics"
  //           ],
  //           "listitems": [
  //             "sketches",
  //             "drawing"
  //           ],
  //           "themes": [
  //             "eat",
  //             "bones"
  //           ],
  //           "year": "2017",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": false,
  //         "themes": [
  //           "eat",
  //           "bones"
  //         ],
  //         "seeAlso": [
  //           "241.jpg"
  //         ],
  //         "location": "London, UK",
  //         "year": "2017",
  //         "_id": "5df2cb6140edab1940975b2d",
  //         "category": {
  //           "studio": {
  //             "wip": [
  //               "sketches"
  //             ]
  //           },
  //           "medium": {
  //             "graphics": [
  //               "drawing"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/20170723_120614.jpg",
  //         "fileName": "20170723_120614.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": "Teeth",
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1393,
  //           "naturalHeight": 954
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/20170723_120614-desktop.jpg",
  //         "mobilePath": "uploads/mobile/20170723_120614-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/20170723_120614-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "20170926_184020.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "_archive",
  //         "displayMain": null,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "",
  //         "year": "",
  //         "_id": "5dfa7f26061ab618f4ee6bed",
  //         "category": {
  //           "studio": {
  //             "misc": []
  //           }
  //         },
  //         "filePath": "uploads/20170926_184020.jpg",
  //         "fileName": "20170926_184020.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": "",
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 608,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 6,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/20170926_184020-desktop.jpg",
  //         "mobilePath": "uploads/mobile/20170926_184020-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/20170926_184020-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "20190418_143219-2.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "studio"
  //           ],
  //           "subcategory": [],
  //           "listitems": [
  //             "cg",
  //             "progress"
  //           ],
  //           "themes": [],
  //           "year": "2019",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Sundown",
  //         "displayMain": null,
  //         "themes": [
  //           "weather",
  //           "celestial body",
  //           "acephale"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2019",
  //         "_id": "5e0e6c9a208f711970b73986",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "cg"
  //             ]
  //           },
  //           "studio": {
  //             "wip": [
  //               "progress"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/20190418_143219-2.jpg",
  //         "fileName": "20190418_143219-2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A female figure facing the setting sun by sea. ",
  //         "artworkTitle": null,
  //         "artworkDescription": "A digital mockup of the image printed on paper and dyed with potassium permanganate. ",
  //         "naturalSize": {
  //           "naturalWidth": 1170,
  //           "naturalHeight": 720
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/20190418_143219-2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/20190418_143219-2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/20190418_143219-2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "20191106_075914.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "misc"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "oil pastel",
  //             "furniture"
  //           ],
  //           "year": "2019",
  //           "location": "Warsaw, Poland"
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": true,
  //         "themes": [
  //           "oil pastel",
  //           "furniture"
  //         ],
  //         "seeAlso": [],
  //         "location": "Warsaw, Poland",
  //         "year": "2019",
  //         "_id": "5e0a12b89ed2212d5071768e",
  //         "category": {
  //           "studio": {
  //             "misc": []
  //           }
  //         },
  //         "filePath": "uploads/20191106_075914.jpg",
  //         "fileName": "20191106_075914.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": "Bed",
  //         "artworkDescription": "Oil pastel in notebook.",
  //         "naturalSize": {
  //           "naturalWidth": 2536,
  //           "naturalHeight": 1960
  //         },
  //         "familyDisplayIndex": 15,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/20191106_075914-desktop.jpg",
  //         "mobilePath": "uploads/mobile/20191106_075914-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/20191106_075914-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "241.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "painting"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "bones"
  //           ],
  //           "year": "2015",
  //           "location": "Coldbath street, London, UK"
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": false,
  //         "themes": [
  //           "bones"
  //         ],
  //         "seeAlso": [
  //           "20170723_120614.jpg",
  //           "emo-sky.jpg",
  //           "shitty-day.jpg"
  //         ],
  //         "location": "Coldbath street, London, UK",
  //         "year": "2015",
  //         "_id": "5df6d16c266b6a2cf4384b59",
  //         "category": {
  //           "medium": {
  //             "painting": []
  //           }
  //         },
  //         "filePath": "uploads/241.jpg",
  //         "fileName": "241.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": "Two painting on one board. Oil pastel (blue), marker, brown oil paint. Found board. \n",
  //         "naturalSize": {
  //           "naturalWidth": 1411,
  //           "naturalHeight": 910
  //         },
  //         "familyDisplayIndex": 6,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/241-desktop.jpg",
  //         "mobilePath": "uploads/mobile/241-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/241-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "65710021.JPG": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [
  //             "color"
  //           ],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Lorenzo",
  //         "displayMain": null,
  //         "themes": [
  //           "social",
  //           "restaurant"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa7981de6a352340297e3a",
  //         "category": {
  //           "medium": {
  //             "photo": [
  //               "color"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/65710021.JPG",
  //         "fileName": "65710021.JPG",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "I ask my two friends and coworkers, both named Lorenzo, to act as models in a couple of scenes. Photographed by Rowan Wigley.",
  //         "artworkTitle": "Hospitality",
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1544,
  //           "naturalHeight": 1024
  //         },
  //         "familyDisplayIndex": 4,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/65710021-desktop.JPG",
  //         "mobilePath": "uploads/mobile/65710021-mob.JPG",
  //         "thumbnailPath": "uploads/thumbnails/65710021-thumbnail.JPG",
  //         "useFamilySetup": false
  //       },
  //       "alex.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Staircase-participants",
  //         "displayMain": null,
  //         "themes": [
  //           "staircase",
  //           "social"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2015",
  //         "_id": "5e08980712172c2514bdb697",
  //         "category": {
  //           "medium": {
  //             "photo": []
  //           }
  //         },
  //         "filePath": "uploads/alex.jpg",
  //         "fileName": "alex.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": "A glazed ceramic bowl on a spray painted styrofoam plint by Alex Gengos.",
  //         "naturalSize": {
  //           "naturalWidth": 718,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/alex-desktop.jpg",
  //         "mobilePath": "uploads/mobile/alex-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/alex-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "apple-pig-close-up.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "painting"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "fruit"
  //           ],
  //           "year": "2017",
  //           "location": "Woolwich, London, UK"
  //         },
  //         "artworkFamily": "Apple pig",
  //         "displayMain": false,
  //         "themes": [
  //           "fruit"
  //         ],
  //         "seeAlso": [
  //           "cherry1.jpg",
  //           "mushroom-strawberry.jpg",
  //           "strawberry-forcefield.jpg",
  //           "trampled.jpg"
  //         ],
  //         "location": "Woolwich, London, UK",
  //         "year": "2017",
  //         "_id": "5df6d18e266b6a2cf4384b5a",
  //         "category": {
  //           "medium": {
  //             "painting": []
  //           }
  //         },
  //         "filePath": "uploads/apple-pig-close-up.jpg",
  //         "fileName": "apple-pig-close-up.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 364,
  //           "naturalHeight": 456
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/apple-pig-close-up-desktop.jpg",
  //         "mobilePath": "uploads/mobile/apple-pig-close-up-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/apple-pig-close-up-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "ash-and-chip.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [
  //             "painting"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "social",
  //             "weather",
  //             "furniture"
  //           ],
  //           "year": "2012",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Chips and ash on snow",
  //         "displayMain": false,
  //         "themes": [
  //           "eat",
  //           "social",
  //           "weather",
  //           "furniture"
  //         ],
  //         "seeAlso": [
  //           "20170723_120614.jpg",
  //           "before-eyes.jpg"
  //         ],
  //         "location": "London, UK",
  //         "year": "2012",
  //         "_id": "5df6d20c266b6a2cf4384b5b",
  //         "category": {
  //           "medium": {
  //             "painting": []
  //           }
  //         },
  //         "filePath": "uploads/ash-and-chip.jpg",
  //         "fileName": "ash-and-chip.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": "Furniture door, wax, various paint.",
  //         "naturalSize": {
  //           "naturalWidth": 1259,
  //           "naturalHeight": 990
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/ash-and-chip-desktop.jpg",
  //         "mobilePath": "uploads/mobile/ash-and-chip-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/ash-and-chip-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "assemblage_2.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Garden scene",
  //         "displayMain": null,
  //         "themes": [
  //           "fountain",
  //           "fruit"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2013",
  //         "_id": "5dfa68fede6a352340297e23",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "installation"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/assemblage_2.jpg",
  //         "fileName": "assemblage_2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 782,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/assemblage_2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/assemblage_2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/assemblage_2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "assemblage_4.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "2013",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Garden scene",
  //         "displayMain": null,
  //         "themes": [
  //           "fountain",
  //           "fruit"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2013",
  //         "_id": "5dfa68f9de6a352340297e22",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "installation"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/assemblage_4.jpg",
  //         "fileName": "assemblage_4.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 799,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/assemblage_4-desktop.jpg",
  //         "mobilePath": "uploads/mobile/assemblage_4-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/assemblage_4-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "before-eyes-1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "wip",
  //             "studio"
  //           ],
  //           "listitems": [
  //             "progress"
  //           ],
  //           "themes": [],
  //           "year": "",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Before eyes",
  //         "displayMain": null,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2017",
  //         "_id": "5e0a0d569ed2212d50717685",
  //         "category": {
  //           "medium": {
  //             "painting": []
  //           },
  //           "studio": {
  //             "wip": [
  //               "progress"
  //             ],
  //             "studio": []
  //           }
  //         },
  //         "filePath": "uploads/before-eyes-1.jpg",
  //         "fileName": "before-eyes-1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 525,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/before-eyes-1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/before-eyes-1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/before-eyes-1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "before-eyes-2.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Before eyes",
  //         "displayMain": null,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Woolwich, London, UK",
  //         "year": "2017",
  //         "_id": "5e0a0c5b9ed2212d50717682",
  //         "category": {
  //           "medium": {
  //             "painting": []
  //           },
  //           "studio": {
  //             "wip": []
  //           }
  //         },
  //         "filePath": "uploads/before-eyes-2.jpg",
  //         "fileName": "before-eyes-2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 720,
  //           "naturalHeight": 961
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/before-eyes-2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/before-eyes-2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/before-eyes-2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "before-eyes-3.jpeg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Before eyes",
  //         "displayMain": null,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Woolwich, London, UK",
  //         "year": "2017",
  //         "_id": "5e0a0c5b9ed2212d50717683",
  //         "category": {
  //           "medium": {
  //             "painting": []
  //           },
  //           "studio": {
  //             "wip": []
  //           }
  //         },
  //         "filePath": "uploads/before-eyes-3.jpeg",
  //         "fileName": "before-eyes-3.jpeg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1440,
  //           "naturalHeight": 1920
  //         },
  //         "familyDisplayIndex": 3,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/before-eyes-3-desktop.jpeg",
  //         "mobilePath": "uploads/mobile/before-eyes-3-mob.jpeg",
  //         "thumbnailPath": "uploads/thumbnails/before-eyes-3-thumbnail.jpeg",
  //         "useFamilySetup": false
  //       },
  //       "before-eyes.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [
  //             "painting"
  //           ],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "2017",
  //           "location": "Woolwich, London, UK"
  //         },
  //         "artworkFamily": "Before eyes",
  //         "displayMain": true,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Woolwich, London, UK",
  //         "year": "2017",
  //         "_id": "5df6d2b0266b6a2cf4384b5c",
  //         "category": {
  //           "medium": {
  //             "painting": []
  //           },
  //           "studio": {
  //             "wip": []
  //           }
  //         },
  //         "filePath": "uploads/before-eyes.jpg",
  //         "fileName": "before-eyes.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": "",
  //         "artworkDescription": "Stitched dust protection sheet stretched on custom frame, various paints, ballpoint pen, soft pastel. ",
  //         "naturalSize": {
  //           "naturalWidth": 608,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/before-eyes-desktop.jpg",
  //         "mobilePath": "uploads/mobile/before-eyes-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/before-eyes-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "bench-3.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Bench",
  //         "displayMain": null,
  //         "themes": [
  //           "furniture",
  //           "social"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5df6cef8266b6a2cf4384b56",
  //         "category": {
  //           "public": {
  //             "other": []
  //           },
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/bench-3.jpg",
  //         "fileName": "bench-3.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "In 2018 I attended a professional training programme. The atmosphere felt oppressive. I made this bench, brought it over to school and chained it around a column. It has two modes: bench and ashtray (made from groin protector). The building security (male) approached me as soon as I entered the building and asked if I had permission chain down the bench. I, aggro-defensively, lied that I had. Later I had to speak to the director of the school (female), to whom I presented the bench as a public benefit and so the bench stayed. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 608,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 4,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/bench-3-desktop.jpg",
  //         "mobilePath": "uploads/mobile/bench-3-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/bench-3-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "bench-public-1.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Bench",
  //         "displayMain": false,
  //         "themes": [
  //           "furniture",
  //           "social"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5df6cef8266b6a2cf4384b54",
  //         "category": {
  //           "public": {
  //             "other": []
  //           },
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/bench-public-1.jpg",
  //         "fileName": "bench-public-1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "In 2018 I attended a professional training programme. The atmosphere felt oppressive. I made this bench, brought it over to school and chained it around a column. It has two modes: bench and ashtray (made from groin protector). The building security (male) approached me as soon as I entered the building and asked if I had permission chain down the bench. I, aggro-defensively, lied that I had. Later I had to speak to the director of the school (female), to whom I presented the bench as a public benefit and so the bench stayed. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 498,
  //           "naturalHeight": 872
  //         },
  //         "familyDisplayIndex": 3,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/bench-public-1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/bench-public-1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/bench-public-1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "bench-public-2.png": {
  //         "displayTriggers": {
  //           "category": [
  //             "public",
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture",
  //             "other"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "furniture",
  //             "social"
  //           ],
  //           "year": "2018",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Bench",
  //         "displayMain": true,
  //         "themes": [
  //           "furniture",
  //           "social"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5df6cef8266b6a2cf4384b55",
  //         "category": {
  //           "public": {
  //             "other": []
  //           },
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/bench-public-2.png",
  //         "fileName": "bench-public-2.png",
  //         "fileType": "image/png",
  //         "familyDescription": "In 2018 I attended a professional training programme. The atmosphere felt oppressive. I made this bench, brought it over to school and chained it around a column. It has two modes: bench and ashtray (made from groin protector). The building security (male) approached me as soon as I entered the building and asked if I had permission chain down the bench. I, aggro-defensively, lied that I had. Later I had to speak to the director of the school (female), to whom I presented the bench as a public benefit and so the bench stayed. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 990,
  //           "naturalHeight": 562
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/bench-public-2-desktop.png",
  //         "mobilePath": "uploads/mobile/bench-public-2-mob.png",
  //         "thumbnailPath": "uploads/thumbnails/bench-public-2-thumbnail.png",
  //         "useFamilySetup": false
  //       },
  //       "bench1.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Bench",
  //         "displayMain": null,
  //         "themes": [
  //           "furniture",
  //           "social"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5df6cef8266b6a2cf4384b52",
  //         "category": {
  //           "public": {
  //             "other": []
  //           },
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/bench1.jpg",
  //         "fileName": "bench1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "In 2018 I attended a professional training programme. The atmosphere felt oppressive. I made this bench, brought it over to school and chained it around a column. It has two modes: bench and ashtray (made from groin protector). The building security (male) approached me as soon as I entered the building and asked if I had permission chain down the bench. I, aggro-defensively, lied that I had. Later I had to speak to the director of the school (female), to whom I presented the bench as a public benefit and so the bench stayed. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 642,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/bench1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/bench1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/bench1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "bench2.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Bench",
  //         "displayMain": false,
  //         "themes": [
  //           "furniture",
  //           "social"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5df6cef8266b6a2cf4384b53",
  //         "category": {
  //           "public": {
  //             "other": []
  //           },
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/bench2.jpg",
  //         "fileName": "bench2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "In 2018 I attended a professional training programme. The atmosphere felt oppressive. I made this bench, brought it over to school and chained it around a column. It has two modes: bench and ashtray (made from groin protector). The building security (male) approached me as soon as I entered the building and asked if I had permission chain down the bench. I, aggro-defensively, lied that I had. Later I had to speak to the director of the school (female), to whom I presented the bench as a public benefit and so the bench stayed. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 679,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/bench2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/bench2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/bench2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "blue-frame-1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [
  //             "ceramics"
  //           ],
  //           "themes": [
  //             "frame"
  //           ],
  //           "year": "2019",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Blue frame",
  //         "displayMain": true,
  //         "themes": [
  //           "frame"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2019",
  //         "_id": "5e0a0e149ed2212d50717687",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "ceramics"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/blue-frame-1.jpg",
  //         "fileName": "blue-frame-1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Unfired clay frame covered with paraffin wax and spray painted blue. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1196,
  //           "naturalHeight": 720
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/blue-frame-1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/blue-frame-1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/blue-frame-1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "blue-frame-2.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [
  //             "studio",
  //             "wip"
  //           ],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Blue frame",
  //         "displayMain": null,
  //         "themes": [
  //           "frame"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2019",
  //         "_id": "5e0a0e149ed2212d50717688",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "ceramics"
  //             ]
  //           },
  //           "studio": {
  //             "studio": [],
  //             "wip": []
  //           }
  //         },
  //         "filePath": "uploads/blue-frame-2.jpg",
  //         "fileName": "blue-frame-2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Unfired clay frame covered with paraffin wax and spray painted blue. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1920,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/blue-frame-2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/blue-frame-2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/blue-frame-2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "buddy.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "graphics"
  //           ],
  //           "listitems": [
  //             "drawing"
  //           ],
  //           "themes": [],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": false,
  //         "themes": [],
  //         "seeAlso": [
  //           "DSC_7228.jpg",
  //           "crescentBoxing.jpg"
  //         ],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5df2d1ff40edab1940975b3d",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "drawing"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/buddy.jpg",
  //         "fileName": "buddy.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": "Buddy",
  //         "artworkDescription": "I gave this to Anya, we worked together.",
  //         "naturalSize": {
  //           "naturalWidth": 843,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 3,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/buddy-desktop.jpg",
  //         "mobilePath": "uploads/mobile/buddy-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/buddy-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "buried-in-meat-2.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "misc"
  //           ],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "2018",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": false,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5e0a17a59ed2212d50717698",
  //         "category": {
  //           "studio": {
  //             "misc": []
  //           }
  //         },
  //         "filePath": "uploads/buried-in-meat-2.jpg",
  //         "fileName": "buried-in-meat-2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 415,
  //           "naturalHeight": 738
  //         },
  //         "familyDisplayIndex": 16,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/buried-in-meat-2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/buried-in-meat-2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/buried-in-meat-2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "ceramic-stand-2.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "wip"
  //           ],
  //           "listitems": [
  //             "progress"
  //           ],
  //           "themes": [
  //             "vessel"
  //           ],
  //           "year": "2019",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Clay stand",
  //         "displayMain": true,
  //         "themes": [
  //           "vessel"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2019",
  //         "_id": "5e0a0fef9ed2212d5071768b",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "ceramics"
  //             ]
  //           },
  //           "studio": {
  //             "wip": [
  //               "progress"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/ceramic-stand-2.jpg",
  //         "fileName": "ceramic-stand-2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Initial design involved three recesses: \nfor flax seeds, for a wax apple and for up to two low denomination coins. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1960,
  //           "naturalHeight": 2989
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/ceramic-stand-2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/ceramic-stand-2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/ceramic-stand-2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "ceramic-stand-3.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [
  //             "ceramics"
  //           ],
  //           "themes": [
  //             "vessel"
  //           ],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Clay stand",
  //         "displayMain": true,
  //         "themes": [
  //           "vessel"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2019",
  //         "_id": "5e0a0fef9ed2212d5071768a",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "ceramics"
  //             ]
  //           },
  //           "studio": {
  //             "wip": []
  //           }
  //         },
  //         "filePath": "uploads/ceramic-stand-3.jpg",
  //         "fileName": "ceramic-stand-3.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Initial design involved three recesses: \nfor flax seeds, for a wax apple and for up to two low denomination coins. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 525,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/ceramic-stand-3-desktop.jpg",
  //         "mobilePath": "uploads/mobile/ceramic-stand-3-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/ceramic-stand-3-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "char-creation-1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "studio"
  //           ],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "2019",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": null,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2019",
  //         "_id": "5e0a123a9ed2212d5071768c",
  //         "category": {
  //           "studio": {
  //             "studio": [],
  //             "wip": [
  //               "sketches"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/char-creation-1.jpg",
  //         "fileName": "char-creation-1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": "Char creation",
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1080,
  //           "naturalHeight": 525
  //         },
  //         "familyDisplayIndex": 13,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/char-creation-1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/char-creation-1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/char-creation-1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "char-creation-2.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [
  //             "sketches"
  //           ],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": false,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2019",
  //         "_id": "5e0a123a9ed2212d5071768d",
  //         "category": {
  //           "studio": {
  //             "wip": [
  //               "sketches"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/char-creation-2.jpg",
  //         "fileName": "char-creation-2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": "Char creation",
  //         "artworkDescription": "Depicts a character creation window commonly seen in role-playing video games.",
  //         "naturalSize": {
  //           "naturalWidth": 1080,
  //           "naturalHeight": 772
  //         },
  //         "familyDisplayIndex": 14,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/char-creation-2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/char-creation-2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/char-creation-2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "cherry1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "graphics"
  //           ],
  //           "listitems": [
  //             "cg"
  //           ],
  //           "themes": [
  //             "fruit"
  //           ],
  //           "year": "2018",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Cherry",
  //         "displayMain": true,
  //         "themes": [
  //           "fruit"
  //         ],
  //         "seeAlso": [
  //           "201911281605236_BGFC2LL5.jpg",
  //           "20170723_120614.jpg",
  //           "20170817_172102.jpg",
  //           "2019_superbig_00_see_the_bigger_picture_PC.jpg",
  //           "galaxy-watch-active2-hr-monitoring-sensor-effect.png",
  //           "im0035_explore_article-thumbnail_pc_1440x1060.jpg"
  //         ],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5df6cc83266b6a2cf4384b4f",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "cg",
  //               "print material"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/cherry1.jpg",
  //         "fileName": "cherry1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A Christmas present I made for my brother Darius and his girlfriend Sandra",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 2480,
  //           "naturalHeight": 3508
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/cherry1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/cherry1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/cherry1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "cherry2.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [
  //             "print material"
  //           ],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Cherry",
  //         "displayMain": null,
  //         "themes": [
  //           "fruit"
  //         ],
  //         "seeAlso": [
  //           "201911281605236_BGFC2LL5.jpg",
  //           "20170723_120614.jpg",
  //           "20170817_172102.jpg",
  //           "2019_superbig_00_see_the_bigger_picture_PC.jpg",
  //           "galaxy-watch-active2-hr-monitoring-sensor-effect.png",
  //           "im0035_explore_article-thumbnail_pc_1440x1060.jpg"
  //         ],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5df6cc83266b6a2cf4384b50",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "cg",
  //               "print material"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/cherry2.jpg",
  //         "fileName": "cherry2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A Christmas present I made for my brother Darius and his girlfriend Sandra",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 7020,
  //           "naturalHeight": 9930
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/cherry2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/cherry2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/cherry2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "chicken_leg_1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "studio"
  //           ],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Chicken leg",
  //         "displayMain": null,
  //         "themes": [
  //           "metal",
  //           "support"
  //         ],
  //         "seeAlso": [],
  //         "location": "",
  //         "year": "2013",
  //         "_id": "5dfa67aede6a352340297e18",
  //         "category": {
  //           "medium": {
  //             "sculpture": []
  //           },
  //           "studio": {
  //             "studio": []
  //           }
  //         },
  //         "filePath": "uploads/chicken_leg_1.jpg",
  //         "fileName": "chicken_leg_1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 721,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/chicken_leg_1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/chicken_leg_1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/chicken_leg_1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "chicken_leg_2.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "metal",
  //             "support"
  //           ],
  //           "year": "2013",
  //           "location": ""
  //         },
  //         "artworkFamily": "Chicken leg",
  //         "displayMain": true,
  //         "themes": [
  //           "metal",
  //           "support"
  //         ],
  //         "seeAlso": [
  //           "foot-with-handle-1.jpg"
  //         ],
  //         "location": "",
  //         "year": "2013",
  //         "_id": "5dfa67aede6a352340297e19",
  //         "category": {
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/chicken_leg_2.jpg",
  //         "fileName": "chicken_leg_2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1618,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/chicken_leg_2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/chicken_leg_2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/chicken_leg_2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "chicken_leg_wip_2.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "_archive",
  //         "displayMain": null,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "",
  //         "year": "",
  //         "_id": "5dfa67aede6a352340297e1b",
  //         "category": {
  //           "studio": {
  //             "misc": []
  //           }
  //         },
  //         "filePath": "uploads/chicken_leg_wip_2.jpg",
  //         "fileName": "chicken_leg_wip_2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 705,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/chicken_leg_wip_2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/chicken_leg_wip_2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/chicken_leg_wip_2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "chips-and-ash-on-snow.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "studio"
  //           ],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Chips and ash on snow",
  //         "displayMain": null,
  //         "themes": [
  //           "social",
  //           "weather"
  //         ],
  //         "seeAlso": [
  //           "20170723_120614.jpg"
  //         ],
  //         "location": "London, UK",
  //         "year": "2012",
  //         "_id": "5dfdf8fde7c9572b24e752a5",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "drawing"
  //             ]
  //           },
  //           "studio": {
  //             "wip": [
  //               "sketches"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/chips-and-ash-on-snow.jpg",
  //         "fileName": "chips-and-ash-on-snow.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1440,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/chips-and-ash-on-snow-desktop.jpg",
  //         "mobilePath": "uploads/mobile/chips-and-ash-on-snow-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/chips-and-ash-on-snow-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "chips3.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [
  //             "sketches"
  //           ],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Chips and ash on snow",
  //         "displayMain": false,
  //         "themes": [
  //           "eat",
  //           "social",
  //           "weather"
  //         ],
  //         "seeAlso": [
  //           "20170723_120614.jpg"
  //         ],
  //         "location": "London, UK",
  //         "year": "2012",
  //         "_id": "5df6cb96266b6a2cf4384b4e",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "drawing"
  //             ]
  //           },
  //           "studio": {
  //             "wip": [
  //               "sketches"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/chips3.jpg",
  //         "fileName": "chips3.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 2900,
  //           "naturalHeight": 1836
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/chips3-desktop.jpg",
  //         "mobilePath": "uploads/mobile/chips3-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/chips3-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "connectedSpheres1.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": null,
  //           "location": null
  //         },
  //         "artworkFamily": "Connected spheres",
  //         "displayMain": null,
  //         "themes": [
  //           "connected spheres"
  //         ],
  //         "seeAlso": [],
  //         "location": null,
  //         "year": null,
  //         "_id": "5df6c8e3266b6a2cf4384b45",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "drawing"
  //             ]
  //           },
  //           "studio": {
  //             "wip": [
  //               "sketches",
  //               "progress"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/connectedSpheres1.jpg",
  //         "fileName": "connectedSpheres1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1746,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/connectedSpheres1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/connectedSpheres1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/connectedSpheres1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "connectedSpheres2.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium",
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "graphics",
  //             "wip"
  //           ],
  //           "listitems": [
  //             "drawing",
  //             "sketches"
  //           ],
  //           "themes": [
  //             "connected spheres"
  //           ],
  //           "year": "2017",
  //           "location": "Woolwich, London, UK"
  //         },
  //         "artworkFamily": "Connected spheres",
  //         "displayMain": true,
  //         "themes": [
  //           "connected spheres"
  //         ],
  //         "seeAlso": [
  //           "stage_kieme_1.jpg",
  //           "malonioji_1.jpg",
  //           "kiss-0.jpg"
  //         ],
  //         "location": "Woolwich, London, UK",
  //         "year": "2017",
  //         "_id": "5df6c8e3266b6a2cf4384b46",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "drawing"
  //             ]
  //           },
  //           "studio": {
  //             "wip": [
  //               "sketches"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/connectedSpheres2.jpg",
  //         "fileName": "connectedSpheres2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1424,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/connectedSpheres2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/connectedSpheres2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/connectedSpheres2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "crescentBoxing.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "graphics"
  //           ],
  //           "listitems": [
  //             "drawing"
  //           ],
  //           "themes": [
  //             "crescent",
  //             "restaurant",
  //             "celestial body"
  //           ],
  //           "year": "2015",
  //           "location": "Coldbath street, London, UK",
  //           "artworkDescription": []
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": false,
  //         "themes": [
  //           "crescent",
  //           "restaurant",
  //           "celestial body"
  //         ],
  //         "seeAlso": [
  //           "marker-and-ballpoint.jpg",
  //           "buddy.jpg",
  //           "star_5.jpg"
  //         ],
  //         "location": "Coldbath street, London, UK",
  //         "year": "2015",
  //         "_id": "5df2d2e040edab1940975b3e",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "drawing"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/crescentBoxing.jpg",
  //         "fileName": "crescentBoxing.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": "I gave this to one of Lorenzos I know. Before he moved away he wanted to box with me. It was more exhausting than we expecting so in the end he asked me to just hit his head with my fist. \nRendered on a napkin from a restaurant we both worked at.",
  //         "naturalSize": {
  //           "naturalWidth": 1923,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 4,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/crescentBoxing-desktop.jpg",
  //         "mobilePath": "uploads/mobile/crescentBoxing-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/crescentBoxing-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "days2.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "days",
  //             "metal"
  //           ],
  //           "year": "2015",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Days",
  //         "displayMain": true,
  //         "themes": [
  //           "days",
  //           "metal"
  //         ],
  //         "seeAlso": [
  //           "WP_20150806_004.jpg",
  //           "WP_20150806_007.jpg"
  //         ],
  //         "location": "London, UK",
  //         "year": "2015",
  //         "_id": "5df6cfe7266b6a2cf4384b58",
  //         "category": {
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/days2.jpg",
  //         "fileName": "days2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 607,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/days2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/days2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/days2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "detail_testciles_2.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [
  //             "fruit"
  //           ],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Garden scene",
  //         "displayMain": false,
  //         "themes": [
  //           "fountain",
  //           "fruit"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2013",
  //         "_id": "5dfa68ebde6a352340297e1f",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "installation"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/detail_testciles_2.jpg",
  //         "fileName": "detail_testciles_2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 860,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/detail_testciles_2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/detail_testciles_2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/detail_testciles_2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "DSC_7228.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "painting"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "fruit"
  //           ],
  //           "year": "2017",
  //           "location": "Woolwich, London, UK"
  //         },
  //         "artworkFamily": "Apple pig",
  //         "displayMain": false,
  //         "themes": [
  //           "fruit"
  //         ],
  //         "seeAlso": [
  //           "cherry1.jpg"
  //         ],
  //         "location": "Woolwich, London, UK",
  //         "year": "2017",
  //         "_id": "5dea6179b6cb823fccea64f8",
  //         "category": {
  //           "medium": {
  //             "painting": []
  //           }
  //         },
  //         "filePath": "uploads/DSC_7228.jpg",
  //         "fileName": "DSC_7228.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 717,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/DSC_7228-desktop.jpg",
  //         "mobilePath": "uploads/mobile/DSC_7228-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/DSC_7228-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "emo-sky.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "painting"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "weather",
  //             "cloud",
  //             "bones"
  //           ],
  //           "year": "2015",
  //           "location": "Coldbath street, London, UK"
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": false,
  //         "themes": [
  //           "weather",
  //           "cloud",
  //           "bones"
  //         ],
  //         "seeAlso": [
  //           "241.jpg",
  //           "shitty-day.jpg",
  //           "marker-and-ballpoint.jpg"
  //         ],
  //         "location": "Coldbath street, London, UK",
  //         "year": "2015",
  //         "_id": "5df6d32b266b6a2cf4384b5d",
  //         "category": {
  //           "medium": {
  //             "painting": []
  //           }
  //         },
  //         "filePath": "uploads/emo-sky.jpg",
  //         "fileName": "emo-sky.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": "Skull print fabric stretched over found board, white pigment or plaster powder, blue oil pastel",
  //         "naturalSize": {
  //           "naturalWidth": 910,
  //           "naturalHeight": 572
  //         },
  //         "familyDisplayIndex": 7,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/emo-sky-desktop.jpg",
  //         "mobilePath": "uploads/mobile/emo-sky-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/emo-sky-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "foot-with-handle-1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "wip"
  //           ],
  //           "listitems": [
  //             "plaster"
  //           ],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Foot with a handle",
  //         "displayMain": false,
  //         "themes": [
  //           "tools"
  //         ],
  //         "seeAlso": [
  //           "chicken_leg_2.jpg",
  //           "kolona.jpg"
  //         ],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5e0a137d9ed2212d50717692",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "ceramics",
  //               "plaster"
  //             ]
  //           },
  //           "studio": {
  //             "wip": []
  //           }
  //         },
  //         "filePath": "uploads/foot-with-handle-1.jpg",
  //         "fileName": "foot-with-handle-1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A clay or plaster (cast) foot propped on various furniture handles. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 608,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/foot-with-handle-1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/foot-with-handle-1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/foot-with-handle-1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "foot-with-handle-2.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [
  //             "ceramics",
  //             "plaster"
  //           ],
  //           "themes": [
  //             "tools"
  //           ],
  //           "year": "2018",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Foot with a handle",
  //         "displayMain": true,
  //         "themes": [
  //           "tools"
  //         ],
  //         "seeAlso": [
  //           "chicken_leg_2.jpg",
  //           "kolona.jpg"
  //         ],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5e0a137d9ed2212d50717693",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "ceramics",
  //               "plaster"
  //             ]
  //           },
  //           "studio": {
  //             "wip": []
  //           }
  //         },
  //         "filePath": "uploads/foot-with-handle-2.jpg",
  //         "fileName": "foot-with-handle-2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A clay or plaster (cast) foot propped on various furniture handles. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1459,
  //           "naturalHeight": 2593
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/foot-with-handle-2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/foot-with-handle-2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/foot-with-handle-2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "foot-with-handle-4.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "_archive",
  //         "displayMain": null,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "",
  //         "year": "",
  //         "_id": "5e0a137d9ed2212d50717691",
  //         "category": {
  //           "studio": {
  //             "misc": []
  //           }
  //         },
  //         "filePath": "uploads/foot-with-handle-4.jpg",
  //         "fileName": "foot-with-handle-4.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 608,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 7,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/foot-with-handle-4-desktop.jpg",
  //         "mobilePath": "uploads/mobile/foot-with-handle-4-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/foot-with-handle-4-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "foot-with-handle-5.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Foot with a handle",
  //         "displayMain": null,
  //         "themes": [
  //           "tools"
  //         ],
  //         "seeAlso": [
  //           "chicken_leg_2.jpg",
  //           "kolona.jpg"
  //         ],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5e0a137d9ed2212d50717690",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "ceramics",
  //               "plaster"
  //             ]
  //           },
  //           "studio": {
  //             "wip": []
  //           }
  //         },
  //         "filePath": "uploads/foot-with-handle-5.jpg",
  //         "fileName": "foot-with-handle-5.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A clay or plaster (cast) foot propped on various furniture handles. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1080,
  //           "naturalHeight": 608
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/foot-with-handle-5-desktop.jpg",
  //         "mobilePath": "uploads/mobile/foot-with-handle-5-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/foot-with-handle-5-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "ghost_1.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [
  //             "misc"
  //           ],
  //           "listitems": [
  //             "installation"
  //           ],
  //           "themes": [],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Ghost",
  //         "displayMain": null,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa69b1de6a352340297e25",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "installation",
  //               "plaster"
  //             ]
  //           },
  //           "studio": {
  //             "misc": []
  //           }
  //         },
  //         "filePath": "uploads/ghost_1.jpg",
  //         "fileName": "ghost_1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 614,
  //           "naturalHeight": 920
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/ghost_1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/ghost_1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/ghost_1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "ghost_2.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [
  //             "plaster"
  //           ],
  //           "themes": [
  //             "metal"
  //           ],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Ghost",
  //         "displayMain": true,
  //         "themes": [
  //           "metal"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa69b1de6a352340297e26",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "plaster"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/ghost_2.jpg",
  //         "fileName": "ghost_2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 720,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/ghost_2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/ghost_2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/ghost_2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "ghost_3.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "tools"
  //           ],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Ghost",
  //         "displayMain": null,
  //         "themes": [
  //           "tools"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa69b1de6a352340297e27",
  //         "category": {
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/ghost_3.jpg",
  //         "fileName": "ghost_3.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1543,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/ghost_3-desktop.jpg",
  //         "mobilePath": "uploads/mobile/ghost_3-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/ghost_3-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "gradient0.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "graphics"
  //           ],
  //           "listitems": [
  //             "drawing"
  //           ],
  //           "themes": [
  //             "acephale"
  //           ],
  //           "year": "2016",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "acephale_gradient",
  //         "displayMain": true,
  //         "themes": [
  //           "acephale"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2016",
  //         "_id": "5df2cdf840edab1940975b38",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "drawing"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/gradient0.jpg",
  //         "fileName": "gradient0.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 764,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/gradient0-desktop.jpg",
  //         "mobilePath": "uploads/mobile/gradient0-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/gradient0-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "gradient2.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "acephale_gradient",
  //         "displayMain": null,
  //         "themes": [
  //           "acephale"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2016",
  //         "_id": "5df2cdf840edab1940975b32",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "drawing"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/gradient2.jpg",
  //         "fileName": "gradient2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 785,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/gradient2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/gradient2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/gradient2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "gradient5.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "_archive",
  //         "displayMain": false,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "",
  //         "year": "",
  //         "_id": "5df2cdf840edab1940975b35",
  //         "category": {
  //           "studio": {
  //             "misc": []
  //           }
  //         },
  //         "filePath": "uploads/gradient5.jpg",
  //         "fileName": "gradient5.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1865,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 4,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/gradient5-desktop.jpg",
  //         "mobilePath": "uploads/mobile/gradient5-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/gradient5-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "gradient6.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "_archive",
  //         "displayMain": null,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "",
  //         "year": "",
  //         "_id": "5df2cdf840edab1940975b33",
  //         "category": {
  //           "studio": {
  //             "misc": []
  //           }
  //         },
  //         "filePath": "uploads/gradient6.jpg",
  //         "fileName": "gradient6.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 731,
  //           "naturalHeight": 857
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/gradient6-desktop.jpg",
  //         "mobilePath": "uploads/mobile/gradient6-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/gradient6-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "gradient7.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "wip"
  //           ],
  //           "listitems": [
  //             "sketches"
  //           ],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "acephale_gradient",
  //         "displayMain": null,
  //         "themes": [
  //           "acephale"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2016",
  //         "_id": "5df2cdf840edab1940975b34",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "drawing"
  //             ]
  //           },
  //           "studio": {
  //             "wip": [
  //               "sketches"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/gradient7.jpg",
  //         "fileName": "gradient7.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 810,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/gradient7-desktop.jpg",
  //         "mobilePath": "uploads/mobile/gradient7-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/gradient7-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "hammerScrew.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium",
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "graphics",
  //             "wip"
  //           ],
  //           "listitems": [
  //             "drawing",
  //             "sketches"
  //           ],
  //           "themes": [
  //             "acephale",
  //             "tools"
  //           ],
  //           "year": "2018",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Hammer screw",
  //         "displayMain": true,
  //         "themes": [
  //           "acephale",
  //           "tools"
  //         ],
  //         "seeAlso": [
  //           "gradient0.jpg"
  //         ],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5df2d0b040edab1940975b3a",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "drawing"
  //             ]
  //           },
  //           "studio": {
  //             "wip": [
  //               "sketches"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/hammerScrew.jpg",
  //         "fileName": "hammerScrew.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": "Hammer screw",
  //         "naturalSize": {
  //           "naturalWidth": 767,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/hammerScrew-desktop.jpg",
  //         "mobilePath": "uploads/mobile/hammerScrew-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/hammerScrew-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "hunter-half-life-2-episode-3.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "painting"
  //           ],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "2015",
  //           "location": "Coldbath street, London, UK"
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": false,
  //         "themes": [],
  //         "seeAlso": [
  //           "malonioji_1.jpg",
  //           "malonioji_3.jpg"
  //         ],
  //         "location": "Coldbath street, London, UK",
  //         "year": "2015",
  //         "_id": "5df6d42d266b6a2cf4384b5e",
  //         "category": {
  //           "medium": {
  //             "painting": []
  //           }
  //         },
  //         "filePath": "uploads/hunter-half-life-2-episode-3.jpg",
  //         "fileName": "hunter-half-life-2-episode-3.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": "Hunter (Half-life 2: Episode 3)",
  //         "artworkDescription": "Painted on a found, oval shaped board that had fabric stretched over it already, perhaps a table top. Based on an exceptionally sexual  enemy design from Half-life 2: Episode 3.",
  //         "naturalSize": {
  //           "naturalWidth": 643,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 8,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/hunter-half-life-2-episode-3-desktop.jpg",
  //         "mobilePath": "uploads/mobile/hunter-half-life-2-episode-3-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/hunter-half-life-2-episode-3-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "james-2.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Staircase-participants",
  //         "displayMain": null,
  //         "themes": [
  //           "staircase",
  //           "social"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2015",
  //         "_id": "5e08987f12172c2514bdb698",
  //         "category": {
  //           "medium": {
  //             "photo": []
  //           }
  //         },
  //         "filePath": "uploads/james-2.jpg",
  //         "fileName": "james-2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": "By James Stradner",
  //         "naturalSize": {
  //           "naturalWidth": 811,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/james-2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/james-2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/james-2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "james_print_1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "graphics",
  //             "photo"
  //           ],
  //           "listitems": [
  //             "print material",
  //             "color"
  //           ],
  //           "themes": [
  //             "social",
  //             "fruit"
  //           ],
  //           "year": "2013",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "James' print",
  //         "displayMain": true,
  //         "themes": [
  //           "social",
  //           "fruit"
  //         ],
  //         "seeAlso": [
  //           "james-1.jpg",
  //           "james-2.jpg"
  //         ],
  //         "location": "London, UK",
  //         "year": "2013",
  //         "_id": "5dfa76b9de6a352340297e38",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ],
  //             "photo": [
  //               "color"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/james_print_1.jpg",
  //         "fileName": "james_print_1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "I attended a dinner party and brought a bouquet of cabbage leaves and a banana. I asked the host to photograph it, print it and leave the photograph in my studio as we were course mates. He complied, but on reverse left a note. I asked to cross that out and return once that is done. ",
  //         "artworkTitle": null,
  //         "artworkDescription": "An enlarged print of this image featured in a self-organized display of posters in a staircase of a social estate in London, UK.",
  //         "naturalSize": {
  //           "naturalWidth": 716,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/james_print_1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/james_print_1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/james_print_1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "james_print_2.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "graphics",
  //             "photo"
  //           ],
  //           "listitems": [
  //             "print material",
  //             "color"
  //           ],
  //           "themes": [
  //             "social",
  //             "fruit"
  //           ],
  //           "year": "2013",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "James' print",
  //         "displayMain": null,
  //         "themes": [
  //           "social",
  //           "fruit"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2013",
  //         "_id": "5dfa76b9de6a352340297e37",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ],
  //             "photo": [
  //               "color"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/james_print_2.jpg",
  //         "fileName": "james_print_2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "I attended a dinner party and brought a bouquet of cabbage leaves and a banana. I asked the host to photograph it, print it and leave the photograph in my studio as we were course mates. He complied, but on reverse left a note. I asked to cross that out and return once that is done. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 509,
  //           "naturalHeight": 720
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/james_print_2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/james_print_2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/james_print_2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "jonas-2.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Staircase-participants",
  //         "displayMain": null,
  //         "themes": [
  //           "staircase",
  //           "social"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2015",
  //         "_id": "5e0898c312172c2514bdb69a",
  //         "category": {
  //           "medium": {
  //             "photo": []
  //           }
  //         },
  //         "filePath": "uploads/jonas-2.jpg",
  //         "fileName": "jonas-2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 807,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 3,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/jonas-2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/jonas-2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/jonas-2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "jonas.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Staircase-participants",
  //         "displayMain": null,
  //         "themes": [
  //           "staircase",
  //           "social"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2015",
  //         "_id": "5e0898c312172c2514bdb699",
  //         "category": {
  //           "medium": {
  //             "photo": []
  //           }
  //         },
  //         "filePath": "uploads/jonas.jpg",
  //         "fileName": "jonas.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": "By Jonas Lozoraitis",
  //         "naturalSize": {
  //           "naturalWidth": 808,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/jonas-desktop.jpg",
  //         "mobilePath": "uploads/mobile/jonas-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/jonas-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "jozin-1.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [
  //             "print material",
  //             "installation"
  //           ],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Jozin print",
  //         "displayMain": null,
  //         "themes": [
  //           "acephale",
  //           "tools"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5e0a64987d57c70eb872ee96",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ],
  //             "sculpture": [
  //               "installation"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/jozin-1.jpg",
  //         "fileName": "jozin-1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A print on commercial banner, held to a wall with an excess of fixtures.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1618,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/jozin-1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/jozin-1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/jozin-1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "jozin-2.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "photo"
  //           ],
  //           "listitems": [
  //             "color"
  //           ],
  //           "themes": [],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Jozin print",
  //         "displayMain": true,
  //         "themes": [
  //           "acephale"
  //         ],
  //         "seeAlso": [
  //           "Untitled32.jpg"
  //         ],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5e0a64987d57c70eb872ee97",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ],
  //             "photo": [
  //               "color"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/jozin-2.jpg",
  //         "fileName": "jozin-2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A print on commercial banner, held to a wall with an excess of fixtures.",
  //         "artworkTitle": null,
  //         "artworkDescription": "A portrait of me crawling out of a pond in a park in London, smiling as if cheering on the scenario on the right.",
  //         "naturalSize": {
  //           "naturalWidth": 1688,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/jozin-2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/jozin-2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/jozin-2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "jozin-3.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "graphics"
  //           ],
  //           "listitems": [
  //             "print material"
  //           ],
  //           "themes": [
  //             "acephale"
  //           ],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Jozin print",
  //         "displayMain": true,
  //         "themes": [
  //           "acephale"
  //         ],
  //         "seeAlso": [
  //           "woodblock-3.jpg"
  //         ],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5e0a64987d57c70eb872ee98",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/jozin-3.jpg",
  //         "fileName": "jozin-3.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A print on commercial banner, held to a wall with an excess of fixtures.",
  //         "artworkTitle": null,
  //         "artworkDescription": "Two headless figures spinning in a circle, or greeting, or wrestling surrounded in fog. Scanned woodblock print.",
  //         "naturalSize": {
  //           "naturalWidth": 1553,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/jozin-3-desktop.jpg",
  //         "mobilePath": "uploads/mobile/jozin-3-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/jozin-3-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "jozin-4.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Jozin print",
  //         "displayMain": null,
  //         "themes": [
  //           "acephale",
  //           "tools"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5e0a64987d57c70eb872ee94",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/jozin-4.jpg",
  //         "fileName": "jozin-4.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A print on commercial banner, held to a wall with an excess of fixtures.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 834,
  //           "naturalHeight": 552
  //         },
  //         "familyDisplayIndex": 3,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/jozin-4-desktop.jpg",
  //         "mobilePath": "uploads/mobile/jozin-4-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/jozin-4-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "jozin-5.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [
  //             "tools",
  //             "metal",
  //             "support"
  //           ],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Jozin print",
  //         "displayMain": null,
  //         "themes": [
  //           "acephale",
  //           "tools",
  //           "metal",
  //           "support"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5e0a64987d57c70eb872ee95",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/jozin-5.jpg",
  //         "fileName": "jozin-5.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A print on commercial banner, held to a wall with an excess of fixtures.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 711,
  //           "naturalHeight": 853
  //         },
  //         "familyDisplayIndex": 4,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/jozin-5-desktop.jpg",
  //         "mobilePath": "uploads/mobile/jozin-5-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/jozin-5-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "kiss-0.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [
  //             "other",
  //             "plaster"
  //           ],
  //           "themes": [
  //             "connected spheres",
  //             "kiss"
  //           ],
  //           "year": "2017",
  //           "location": "Woolwich, London, UK"
  //         },
  //         "artworkFamily": "Kissing",
  //         "displayMain": true,
  //         "themes": [
  //           "connected spheres",
  //           "kiss"
  //         ],
  //         "seeAlso": [
  //           "connectedSpheres2.jpg",
  //           "kiss4.jpg"
  //         ],
  //         "location": "Woolwich, London, UK",
  //         "year": "2017",
  //         "_id": "5e0a67d07d57c70eb872ee9c",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "other",
  //               "plaster"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/kiss-0.jpg",
  //         "fileName": "kiss-0.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Plaster, sand, baby oil. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 737,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/kiss-0-desktop.jpg",
  //         "mobilePath": "uploads/mobile/kiss-0-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/kiss-0-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "kiss-2.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "wip",
  //             "studio"
  //           ],
  //           "listitems": [
  //             "other",
  //             "progress"
  //           ],
  //           "themes": [
  //             "connected spheres"
  //           ],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Kissing",
  //         "displayMain": null,
  //         "themes": [
  //           "connected spheres",
  //           "kiss"
  //         ],
  //         "seeAlso": [],
  //         "location": "Woolwich, London, UK",
  //         "year": "2017",
  //         "_id": "5e0a67d07d57c70eb872ee9b",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "other",
  //               "plaster"
  //             ]
  //           },
  //           "studio": {
  //             "wip": [
  //               "progress"
  //             ],
  //             "studio": []
  //           }
  //         },
  //         "filePath": "uploads/kiss-2.jpg",
  //         "fileName": "kiss-2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Plaster, sand, baby oil. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 608,
  //           "naturalHeight": 916
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/kiss-2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/kiss-2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/kiss-2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "kiss-3.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "misc",
  //             "studio"
  //           ],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "2017",
  //           "location": "Woolwich, London, UK"
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": null,
  //         "themes": [],
  //         "seeAlso": [
  //           "kiss4.jpg"
  //         ],
  //         "location": "Woolwich, London, UK",
  //         "year": "2017",
  //         "_id": "5e0a67317d57c70eb872ee9a",
  //         "category": {
  //           "studio": {
  //             "misc": [],
  //             "studio": []
  //           }
  //         },
  //         "filePath": "uploads/kiss-3.jpg",
  //         "fileName": "kiss-3.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1920,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 18,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/kiss-3-desktop.jpg",
  //         "mobilePath": "uploads/mobile/kiss-3-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/kiss-3-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "kiss4.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "graphics"
  //           ],
  //           "listitems": [
  //             "drawing",
  //             "sketches"
  //           ],
  //           "themes": [
  //             "connected spheres"
  //           ],
  //           "year": "2017",
  //           "location": "Woolwich, London, UK"
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": true,
  //         "themes": [
  //           "connected spheres"
  //         ],
  //         "seeAlso": [
  //           "malonioji_1.jpg",
  //           "kiss-3.jpg",
  //           "kiss-0.jpg"
  //         ],
  //         "location": "Woolwich, London, UK",
  //         "year": "2017",
  //         "_id": "5df2d1a440edab1940975b3c",
  //         "category": {
  //           "studio": {
  //             "wip": [
  //               "sketches"
  //             ]
  //           },
  //           "medium": {
  //             "graphics": [
  //               "drawing"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/kiss4.jpg",
  //         "fileName": "kiss4.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": "Kiss",
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 377,
  //           "naturalHeight": 566
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/kiss4-desktop.jpg",
  //         "mobilePath": "uploads/mobile/kiss4-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/kiss4-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "kolona.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium",
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "sculpture",
  //             "wip"
  //           ],
  //           "listitems": [
  //             "ceramics",
  //             "progress"
  //           ],
  //           "themes": [
  //             "connected spheres",
  //             "support"
  //           ],
  //           "year": "2019",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Kolona",
  //         "displayMain": true,
  //         "themes": [
  //           "connected spheres",
  //           "support"
  //         ],
  //         "seeAlso": [
  //           "foot-with-handle-1.jpg"
  //         ],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2019",
  //         "_id": "5dfa6e64de6a352340297e35",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "ceramics"
  //             ]
  //           },
  //           "studio": {
  //             "wip": [
  //               "progress"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/kolona.jpg",
  //         "fileName": "kolona.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 608,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/kolona-desktop.jpg",
  //         "mobilePath": "uploads/mobile/kolona-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/kolona-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "malonioji_1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium",
  //             "public"
  //           ],
  //           "subcategory": [
  //             "sculpture",
  //             "exhibitions"
  //           ],
  //           "listitems": [
  //             "installation",
  //             "malonioji"
  //           ],
  //           "themes": [],
  //           "year": "2015",
  //           "location": "Vilnius, Lithuania"
  //         },
  //         "artworkFamily": "Poilsis",
  //         "displayMain": true,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Vilnius, Lithuania",
  //         "year": "2015",
  //         "_id": "5dfe01f7e7c9572b24e752a9",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "installation"
  //             ]
  //           },
  //           "public": {
  //             "exhibitions": [
  //               "malonioji"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/malonioji_1.jpg",
  //         "fileName": "malonioji_1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Exhibition and bts shots from an exhibition called Daiktai Sandėlyje.",
  //         "artworkTitle": "Stack",
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 721,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/malonioji_1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/malonioji_1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/malonioji_1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "malonioji_2.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Poilsis",
  //         "displayMain": null,
  //         "themes": [
  //           "cards"
  //         ],
  //         "seeAlso": [],
  //         "location": "Vilnius, Lithuania",
  //         "year": "2015",
  //         "_id": "5dfe01f7e7c9572b24e752aa",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "installation"
  //             ]
  //           },
  //           "public": {
  //             "exhibitions": [
  //               "malonioji"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/malonioji_2.jpg",
  //         "fileName": "malonioji_2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Exhibition and bts shots from an exhibition called Daiktai Sandėlyje.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1618,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/malonioji_2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/malonioji_2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/malonioji_2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "malonioji_3.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium",
  //             "public"
  //           ],
  //           "subcategory": [
  //             "sculpture",
  //             "exhibitions"
  //           ],
  //           "listitems": [
  //             "installation",
  //             "malonioji"
  //           ],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Poilsis",
  //         "displayMain": true,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Vilnius, Lithuania",
  //         "year": "2015",
  //         "_id": "5dfe01f7e7c9572b24e752a8",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "installation"
  //             ]
  //           },
  //           "public": {
  //             "exhibitions": [
  //               "malonioji"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/malonioji_3.jpg",
  //         "fileName": "malonioji_3.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Exhibition and bts shots from an exhibition called Daiktai Sandėlyje.",
  //         "artworkTitle": "Gitaxian Probe",
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 771,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/malonioji_3-desktop.jpg",
  //         "mobilePath": "uploads/mobile/malonioji_3-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/malonioji_3-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "malonioji_4.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium",
  //             "public"
  //           ],
  //           "subcategory": [
  //             "sculpture",
  //             "exhibitions"
  //           ],
  //           "listitems": [
  //             "installation",
  //             "malonioji"
  //           ],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Poilsis",
  //         "displayMain": true,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Vilnius, Lithuania",
  //         "year": "2015",
  //         "_id": "5dfe01f7e7c9572b24e752ab",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "installation"
  //             ]
  //           },
  //           "public": {
  //             "exhibitions": [
  //               "malonioji"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/malonioji_4.jpg",
  //         "fileName": "malonioji_4.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Exhibition and bts shots from an exhibition called Daiktai Sandėlyje.",
  //         "artworkTitle": "Shelf",
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 721,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 3,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/malonioji_4-desktop.jpg",
  //         "mobilePath": "uploads/mobile/malonioji_4-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/malonioji_4-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "marker-and-ballpoint.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "studio",
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "misc",
  //             "graphics"
  //           ],
  //           "listitems": [
  //             "drawing"
  //           ],
  //           "themes": [],
  //           "year": "2012",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": false,
  //         "themes": [],
  //         "seeAlso": [
  //           "crescentBoxing.jpg",
  //           "emo-sky.jpg"
  //         ],
  //         "location": "London, UK",
  //         "year": "2012",
  //         "_id": "5df6cb11266b6a2cf4384b4c",
  //         "category": {
  //           "studio": {
  //             "misc": []
  //           },
  //           "medium": {
  //             "graphics": [
  //               "drawing"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/marker-and-ballpoint.jpg",
  //         "fileName": "marker-and-ballpoint.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": "Two boards, ballpoint pent, highlighter, white paint (gesso?)",
  //         "naturalSize": {
  //           "naturalWidth": 718,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 5,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/marker-and-ballpoint-desktop.jpg",
  //         "mobilePath": "uploads/mobile/marker-and-ballpoint-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/marker-and-ballpoint-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "mirror-shelf-1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [
  //             "other"
  //           ],
  //           "themes": [
  //             "furniture"
  //           ],
  //           "year": "2019",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Mirror shelf",
  //         "displayMain": true,
  //         "themes": [
  //           "furniture"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2019",
  //         "_id": "5e0a16369ed2212d50717695",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "other"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/mirror-shelf-1.jpg",
  //         "fileName": "mirror-shelf-1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A two part contraption devised to hold a mirror on a corner of a wall. Covered in synthetic purple satin and blue felt.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 555,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/mirror-shelf-1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/mirror-shelf-1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/mirror-shelf-1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "mirror-shelf-2.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [
  //             "studio"
  //           ],
  //           "listitems": [
  //             "other"
  //           ],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Mirror shelf",
  //         "displayMain": null,
  //         "themes": [
  //           "furniture"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2019",
  //         "_id": "5e0a16369ed2212d50717696",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "other"
  //             ]
  //           },
  //           "studio": {
  //             "studio": []
  //           }
  //         },
  //         "filePath": "uploads/mirror-shelf-2.jpg",
  //         "fileName": "mirror-shelf-2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A two part contraption devised to hold a mirror on a corner of a wall. Covered in synthetic purple satin and blue felt.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 627,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/mirror-shelf-2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/mirror-shelf-2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/mirror-shelf-2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "mushroom-strawberry.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "metal"
  //           ],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Mushroom",
  //         "displayMain": true,
  //         "themes": [
  //           "metal"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5df6d50a266b6a2cf4384b5f",
  //         "category": {
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/mushroom-strawberry.jpg",
  //         "fileName": "mushroom-strawberry.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": "Mushroom (strawberry)",
  //         "artworkDescription": "Roll-pressed steel sheet, spray paint. Low relief.",
  //         "naturalSize": {
  //           "naturalWidth": 779,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/mushroom-strawberry-desktop.jpg",
  //         "mobilePath": "uploads/mobile/mushroom-strawberry-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/mushroom-strawberry-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "north_1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [
  //             "frame"
  //           ],
  //           "year": "",
  //           "location": "",
  //           "artworkDescription": []
  //         },
  //         "artworkFamily": "North aligned frame",
  //         "displayMain": true,
  //         "themes": [
  //           "frame"
  //         ],
  //         "seeAlso": [],
  //         "location": "Coldbath street, London, UK",
  //         "year": "2015",
  //         "_id": "5e02885319a99537e42a859e",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "plaster"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/north_1.jpg",
  //         "fileName": "north_1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1440,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/north_1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/north_1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/north_1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "north_2.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [
  //             "plaster"
  //           ],
  //           "themes": [],
  //           "year": "2015",
  //           "location": "Coldbath street, London, UK"
  //         },
  //         "artworkFamily": "North aligned frame",
  //         "displayMain": null,
  //         "themes": [
  //           "frame"
  //         ],
  //         "seeAlso": [],
  //         "location": "Coldbath street, London, UK",
  //         "year": "2015",
  //         "_id": "5e02885319a99537e42a859f",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "plaster"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/north_2.jpg",
  //         "fileName": "north_2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 2336,
  //           "naturalHeight": 1455
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/north_2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/north_2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/north_2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "north_3.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": "",
  //           "artworkDescription": []
  //         },
  //         "artworkFamily": "North aligned frame",
  //         "displayMain": null,
  //         "themes": [
  //           "frame"
  //         ],
  //         "seeAlso": [],
  //         "location": "Coldbath street, London, UK",
  //         "year": "2015",
  //         "_id": "5e02885219a99537e42a859d",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "plaster"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/north_3.jpg",
  //         "fileName": "north_3.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1440,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/north_3-desktop.jpg",
  //         "mobilePath": "uploads/mobile/north_3-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/north_3-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "person-on-bridge.png": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [
  //             "misc"
  //           ],
  //           "listitems": [
  //             "sketches"
  //           ],
  //           "themes": [
  //             "oil pastel",
  //             "weather"
  //           ],
  //           "year": "2011",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": null,
  //         "themes": [
  //           "social",
  //           "Time",
  //           "oil pastel",
  //           "weather"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2011",
  //         "_id": "5df6d5a9266b6a2cf4384b60",
  //         "category": {
  //           "studio": {
  //             "wip": [
  //               "sketches"
  //             ],
  //             "misc": []
  //           }
  //         },
  //         "filePath": "uploads/person-on-bridge.png",
  //         "fileName": "person-on-bridge.png",
  //         "fileType": "image/png",
  //         "familyDescription": null,
  //         "artworkTitle": "Person on bridge",
  //         "artworkDescription": "Person on bridge, maybe fishing or just looking at the fog.",
  //         "naturalSize": {
  //           "naturalWidth": 652,
  //           "naturalHeight": 760
  //         },
  //         "familyDisplayIndex": 9,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/person-on-bridge-desktop.png",
  //         "mobilePath": "uploads/mobile/person-on-bridge-mob.png",
  //         "thumbnailPath": "uploads/thumbnails/person-on-bridge-thumbnail.png",
  //         "useFamilySetup": false
  //       },
  //       "portrait.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "studio"
  //           ],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "2018",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "about",
  //         "displayMain": null,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5df2a441f2a6d424d81f3963",
  //         "category": {
  //           "studio": {
  //             "studio": []
  //           }
  //         },
  //         "filePath": "uploads/portrait.jpg",
  //         "fileName": "portrait.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": "b. 1992, Panevėžys, Lithuania. Currently live in Warsaw, Poland. ",
  //         "naturalSize": {
  //           "naturalWidth": 3024,
  //           "naturalHeight": 5376
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/portrait-desktop.jpg",
  //         "mobilePath": "uploads/mobile/portrait-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/portrait-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "red-frame.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium",
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "painting",
  //             "wip"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "frame"
  //           ],
  //           "year": "2017",
  //           "location": "Woolwich, London, UK"
  //         },
  //         "artworkFamily": "Red frame",
  //         "displayMain": true,
  //         "themes": [
  //           "frame"
  //         ],
  //         "seeAlso": [
  //           "velniai_2.jpg",
  //           "north_1.jpg"
  //         ],
  //         "location": "Woolwich, London, UK",
  //         "year": "2017",
  //         "_id": "5df6d605266b6a2cf4384b62",
  //         "category": {
  //           "medium": {
  //             "painting": []
  //           },
  //           "studio": {
  //             "wip": []
  //           }
  //         },
  //         "filePath": "uploads/red-frame.jpg",
  //         "fileName": "red-frame.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": "",
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 608,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/red-frame-desktop.jpg",
  //         "mobilePath": "uploads/mobile/red-frame-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/red-frame-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "rowan-2.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Staircase-participants",
  //         "displayMain": null,
  //         "themes": [
  //           "staircase",
  //           "social"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2015",
  //         "_id": "5e0899d912172c2514bdb69b",
  //         "category": {
  //           "medium": {
  //             "photo": []
  //           }
  //         },
  //         "filePath": "uploads/rowan-2.jpg",
  //         "fileName": "rowan-2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": "A still from a video by Rowan Wigley, featuring Rowan and her father collecting sticks. ",
  //         "naturalSize": {
  //           "naturalWidth": 713,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 4,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/rowan-2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/rowan-2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/rowan-2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "shitty-day.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "painting"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "weather",
  //             "cloud",
  //             "days",
  //             "celestial body"
  //           ],
  //           "year": "2015",
  //           "location": "Coldbath street, London, UK"
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": true,
  //         "themes": [
  //           "weather",
  //           "cloud",
  //           "days",
  //           "celestial body"
  //         ],
  //         "seeAlso": [
  //           "241.jpg",
  //           "emo-sky.jpg"
  //         ],
  //         "location": "Coldbath street, London, UK",
  //         "year": "2015",
  //         "_id": "5df6d705266b6a2cf4384b63",
  //         "category": {
  //           "medium": {
  //             "painting": []
  //           }
  //         },
  //         "filePath": "uploads/shitty-day.jpg",
  //         "fileName": "shitty-day.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": "Šūdina diena",
  //         "artworkDescription": "Brown clouds in brown sky, floating away or hanging heavily in place. When the paint was still wet, I layed some sort of street sign on this board so I could have two of the same painting. ",
  //         "naturalSize": {
  //           "naturalWidth": 1072,
  //           "naturalHeight": 882
  //         },
  //         "familyDisplayIndex": 10,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/shitty-day-desktop.jpg",
  //         "mobilePath": "uploads/mobile/shitty-day-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/shitty-day-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "shy-photos-1.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Shy photographs",
  //         "displayMain": null,
  //         "themes": [
  //           "social"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2015",
  //         "_id": "5e0e51d9208f711970b73970",
  //         "category": {
  //           "medium": {
  //             "photo": [
  //               "color"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/shy-photos-1.jpg",
  //         "fileName": "shy-photos-1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "I intended to take pictures of people in crowds, but felt self-conscious pointing my camera at faces so images are out of focus and shaky. Taken on a double decker bus around Oxford Circus in London, UK.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1080,
  //           "naturalHeight": 810
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/shy-photos-1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/shy-photos-1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/shy-photos-1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "shy-photos-2.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "photo"
  //           ],
  //           "listitems": [
  //             "color"
  //           ],
  //           "themes": [
  //             "social"
  //           ],
  //           "year": "2015",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Shy photographs",
  //         "displayMain": null,
  //         "themes": [
  //           "social"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2015",
  //         "_id": "5e0e51d9208f711970b73971",
  //         "category": {
  //           "medium": {
  //             "photo": [
  //               "color"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/shy-photos-2.jpg",
  //         "fileName": "shy-photos-2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "I intended to take pictures of people in crowds, but felt self-conscious pointing my camera at faces so images are out of focus and shaky. Taken on a double decker bus around Oxford Circus in London, UK.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1080,
  //           "naturalHeight": 810
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/shy-photos-2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/shy-photos-2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/shy-photos-2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "shy-photos-3.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "photo"
  //           ],
  //           "listitems": [
  //             "color"
  //           ],
  //           "themes": [
  //             "social"
  //           ],
  //           "year": "2015",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Shy photographs",
  //         "displayMain": true,
  //         "themes": [
  //           "social"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2015",
  //         "_id": "5e0e51d9208f711970b73972",
  //         "category": {
  //           "medium": {
  //             "photo": [
  //               "color"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/shy-photos-3.jpg",
  //         "fileName": "shy-photos-3.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "I intended to take pictures of people in crowds, but felt self-conscious pointing my camera at faces so images are out of focus and shaky. Taken on a double decker bus around Oxford Circus in London, UK.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1080,
  //           "naturalHeight": 810
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/shy-photos-3-desktop.jpg",
  //         "mobilePath": "uploads/mobile/shy-photos-3-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/shy-photos-3-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "shy-photos-4.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Shy photographs",
  //         "displayMain": null,
  //         "themes": [
  //           "social"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2015",
  //         "_id": "5e0e51d9208f711970b73973",
  //         "category": {
  //           "medium": {
  //             "photo": [
  //               "color"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/shy-photos-4.jpg",
  //         "fileName": "shy-photos-4.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "I intended to take pictures of people in crowds, but felt self-conscious pointing my camera at faces so images are out of focus and shaky. Taken on a double decker bus around Oxford Circus in London, UK.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1080,
  //           "naturalHeight": 810
  //         },
  //         "familyDisplayIndex": 3,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/shy-photos-4-desktop.jpg",
  //         "mobilePath": "uploads/mobile/shy-photos-4-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/shy-photos-4-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "shy-photos-5.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Shy photographs",
  //         "displayMain": null,
  //         "themes": [
  //           "social"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2015",
  //         "_id": "5e0e51d9208f711970b73974",
  //         "category": {
  //           "medium": {
  //             "photo": [
  //               "color"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/shy-photos-5.jpg",
  //         "fileName": "shy-photos-5.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "I intended to take pictures of people in crowds, but felt self-conscious pointing my camera at faces so images are out of focus and shaky. Taken on a double decker bus around Oxford Circus in London, UK.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1080,
  //           "naturalHeight": 810
  //         },
  //         "familyDisplayIndex": 4,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/shy-photos-5-desktop.jpg",
  //         "mobilePath": "uploads/mobile/shy-photos-5-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/shy-photos-5-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "siaudu_batai_1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "social",
  //             "tools"
  //           ],
  //           "year": "2013",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Šiaudų batai",
  //         "displayMain": true,
  //         "themes": [
  //           "social",
  //           "tools"
  //         ],
  //         "seeAlso": [
  //           "malonioji_3.jpg"
  //         ],
  //         "location": "London, UK",
  //         "year": "2013",
  //         "_id": "5dfa6af3de6a352340297e29",
  //         "category": {
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/siaudu_batai_1.jpg",
  //         "fileName": "siaudu_batai_1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Straw, epoxy resin, stick, audio player, 2 soundtracks by Martynas Svilys and Rowan Wigley. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1440,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/siaudu_batai_1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/siaudu_batai_1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/siaudu_batai_1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "siaudu_batai_2.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [
  //             "other"
  //           ],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Šiaudų batai",
  //         "displayMain": null,
  //         "themes": [
  //           "social",
  //           "tools"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2013",
  //         "_id": "5dfa6af3de6a352340297e2a",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "other"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/siaudu_batai_2.jpg",
  //         "fileName": "siaudu_batai_2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Straw, epoxy resin, stick, audio player, 2 soundtracks by Martynas Svilys and Rowan Wigley. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1440,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/siaudu_batai_2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/siaudu_batai_2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/siaudu_batai_2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "stage_kieme_1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [
  //             "other"
  //           ],
  //           "themes": [
  //             "stage",
  //             "connected spheres"
  //           ],
  //           "year": "2016",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Stage kieme",
  //         "displayMain": false,
  //         "themes": [
  //           "stage",
  //           "connected spheres"
  //         ],
  //         "seeAlso": [
  //           "connectedSpheres2.jpg",
  //           "WP_20150814_007.jpg",
  //           "malonioji_1.jpg",
  //           "malonioji_4.jpg"
  //         ],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2016",
  //         "_id": "5dfa6b98de6a352340297e2d",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "other"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/stage_kieme_1.jpg",
  //         "fileName": "stage_kieme_1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1613,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/stage_kieme_1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/stage_kieme_1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/stage_kieme_1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "stage_kieme_2.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Stage kieme",
  //         "displayMain": false,
  //         "themes": [
  //           "stage",
  //           "connected spheres"
  //         ],
  //         "seeAlso": [
  //           "detail_testciles_2.jpg"
  //         ],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2016",
  //         "_id": "5dfa6b98de6a352340297e2c",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "other"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/stage_kieme_2.jpg",
  //         "fileName": "stage_kieme_2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 743,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/stage_kieme_2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/stage_kieme_2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/stage_kieme_2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "staircase-2-0.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "public"
  //           ],
  //           "subcategory": [
  //             "other"
  //           ],
  //           "listitems": [
  //             "print material"
  //           ],
  //           "themes": [
  //             "social",
  //             "staircase"
  //           ],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Staircase",
  //         "displayMain": true,
  //         "themes": [
  //           "social",
  //           "staircase"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5e0883be12172c2514bdb68e",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ]
  //           },
  //           "public": {
  //             "other": []
  //           }
  //         },
  //         "filePath": "uploads/staircase-2-0.jpg",
  //         "fileName": "staircase-2-0.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A show of posters in a social estate in London, UK. Poster images by Stacey Broadbent, Alex Gengos, Jonas Lozoraitis, James Stradner, Martynas Svilys, Rowan Wigley,  and me. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 810,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/staircase-2-0-desktop.jpg",
  //         "mobilePath": "uploads/mobile/staircase-2-0-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/staircase-2-0-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "staircase-2-00.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Staircase",
  //         "displayMain": null,
  //         "themes": [
  //           "social",
  //           "staircase"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5e0883be12172c2514bdb68d",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ]
  //           },
  //           "public": {
  //             "other": []
  //           }
  //         },
  //         "filePath": "uploads/staircase-2-00.jpg",
  //         "fileName": "staircase-2-00.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A show of posters in a social estate in London, UK. Poster images by Stacey Broadbent, Alex Gengos, Jonas Lozoraitis, James Stradner, Martynas Svilys, Rowan Wigley,  and me. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 810,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/staircase-2-00-desktop.jpg",
  //         "mobilePath": "uploads/mobile/staircase-2-00-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/staircase-2-00-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "staircase-2-000.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Staircase",
  //         "displayMain": null,
  //         "themes": [
  //           "social",
  //           "staircase"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5e0883be12172c2514bdb68c",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ]
  //           },
  //           "public": {
  //             "other": []
  //           }
  //         },
  //         "filePath": "uploads/staircase-2-000.jpg",
  //         "fileName": "staircase-2-000.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A show of posters in a social estate in London, UK. Poster images by Stacey Broadbent, Alex Gengos, Jonas Lozoraitis, James Stradner, Martynas Svilys, Rowan Wigley,  and me. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 746,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/staircase-2-000-desktop.jpg",
  //         "mobilePath": "uploads/mobile/staircase-2-000-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/staircase-2-000-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "staircase-2-1.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Staircase",
  //         "displayMain": null,
  //         "themes": [
  //           "social",
  //           "staircase"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5e0883be12172c2514bdb68f",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ]
  //           },
  //           "public": {
  //             "other": []
  //           }
  //         },
  //         "filePath": "uploads/staircase-2-1.jpg",
  //         "fileName": "staircase-2-1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A show of posters in a social estate in London, UK. Poster images by Stacey Broadbent, Alex Gengos, Jonas Lozoraitis, James Stradner, Martynas Svilys, Rowan Wigley,  and me. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 776,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 3,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/staircase-2-1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/staircase-2-1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/staircase-2-1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "staircase-2-3.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Staircase",
  //         "displayMain": null,
  //         "themes": [
  //           "social",
  //           "staircase"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5e0883be12172c2514bdb690",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ]
  //           },
  //           "public": {
  //             "other": []
  //           }
  //         },
  //         "filePath": "uploads/staircase-2-3.jpg",
  //         "fileName": "staircase-2-3.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A show of posters in a social estate in London, UK. Poster images by Stacey Broadbent, Alex Gengos, Jonas Lozoraitis, James Stradner, Martynas Svilys, Rowan Wigley,  and me. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 607,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 4,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/staircase-2-3-desktop.jpg",
  //         "mobilePath": "uploads/mobile/staircase-2-3-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/staircase-2-3-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "staircase-2-4.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Staircase",
  //         "displayMain": null,
  //         "themes": [
  //           "social",
  //           "staircase"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5e0883be12172c2514bdb691",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ]
  //           },
  //           "public": {
  //             "other": []
  //           }
  //         },
  //         "filePath": "uploads/staircase-2-4.jpg",
  //         "fileName": "staircase-2-4.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A show of posters in a social estate in London, UK. Poster images by Stacey Broadbent, Alex Gengos, Jonas Lozoraitis, James Stradner, Martynas Svilys, Rowan Wigley,  and me. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 607,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 5,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/staircase-2-4-desktop.jpg",
  //         "mobilePath": "uploads/mobile/staircase-2-4-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/staircase-2-4-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "staircase-after-1.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "_archive",
  //         "displayMain": null,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "",
  //         "year": "",
  //         "_id": "5e08865212172c2514bdb693",
  //         "category": {
  //           "studio": {
  //             "misc": []
  //           }
  //         },
  //         "filePath": "uploads/staircase-after-1.jpg",
  //         "fileName": "staircase-after-1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 607,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/staircase-after-1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/staircase-after-1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/staircase-after-1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "staircase-after-2.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "public"
  //           ],
  //           "subcategory": [
  //             "other"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "staircase",
  //             "social"
  //           ],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Staircase-later",
  //         "displayMain": null,
  //         "themes": [
  //           "staircase",
  //           "social"
  //         ],
  //         "seeAlso": [
  //           "staircase-2-0.jpg"
  //         ],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5e08865212172c2514bdb695",
  //         "category": {
  //           "public": {
  //             "other": []
  //           }
  //         },
  //         "filePath": "uploads/staircase-after-2.jpg",
  //         "fileName": "staircase-after-2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "I returned to the estate to look at the posters once again, found them stripped off walls leaving white sunfaded rectangles framed with dried dirty mop water.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 607,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/staircase-after-2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/staircase-after-2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/staircase-after-2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "staircase-after-3.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "public"
  //           ],
  //           "subcategory": [
  //             "other"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "staircase",
  //             "social"
  //           ],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Staircase-later",
  //         "displayMain": true,
  //         "themes": [
  //           "staircase",
  //           "social"
  //         ],
  //         "seeAlso": [
  //           "staircase-2-0.jpg"
  //         ],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5e08865212172c2514bdb694",
  //         "category": {
  //           "public": {
  //             "other": []
  //           }
  //         },
  //         "filePath": "uploads/staircase-after-3.jpg",
  //         "fileName": "staircase-after-3.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "I returned to the estate to look at the posters once again, found them stripped off walls leaving white sunfaded rectangles framed with dried dirty mop water.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 607,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/staircase-after-3-desktop.jpg",
  //         "mobilePath": "uploads/mobile/staircase-after-3-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/staircase-after-3-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "star_3.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Star",
  //         "displayMain": null,
  //         "themes": [
  //           "celestial body",
  //           "metal"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa6cebde6a352340297e30",
  //         "category": {
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/star_3.jpg",
  //         "fileName": "star_3.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Plasma-cut steel sheet, lard, adhesive bandage.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 698,
  //           "naturalHeight": 1034
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/star_3-desktop.jpg",
  //         "mobilePath": "uploads/mobile/star_3-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/star_3-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "star_4.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "metal"
  //           ],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Star",
  //         "displayMain": true,
  //         "themes": [
  //           "celestial body",
  //           "metal"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa6cebde6a352340297e31",
  //         "category": {
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/star_4.jpg",
  //         "fileName": "star_4.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Plasma-cut steel sheet, lard, adhesive bandage.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 676,
  //           "naturalHeight": 964
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/star_4-desktop.jpg",
  //         "mobilePath": "uploads/mobile/star_4-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/star_4-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "star_5.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [
  //             "cg"
  //           ],
  //           "themes": [
  //             "celestial body"
  //           ],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Star",
  //         "displayMain": null,
  //         "themes": [
  //           "celestial body",
  //           "metal"
  //         ],
  //         "seeAlso": [
  //           "crescentBoxing.jpg"
  //         ],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa6cebde6a352340297e32",
  //         "category": {
  //           "medium": {
  //             "sculpture": [],
  //             "graphics": [
  //               "cg"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/star_5.jpg",
  //         "fileName": "star_5.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Plasma-cut steel sheet, lard, adhesive bandage.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 232,
  //           "naturalHeight": 217
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/star_5-desktop.jpg",
  //         "mobilePath": "uploads/mobile/star_5-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/star_5-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "strawberry-forcefield.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "painting"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "fruit",
  //             "social"
  //           ],
  //           "year": "2018",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": true,
  //         "themes": [
  //           "fruit",
  //           "social"
  //         ],
  //         "seeAlso": [
  //           "apple-pig-close-up.jpg"
  //         ],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5df6d79d266b6a2cf4384b64",
  //         "category": {
  //           "medium": {
  //             "painting": []
  //           }
  //         },
  //         "filePath": "uploads/strawberry-forcefield.jpg",
  //         "fileName": "strawberry-forcefield.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": "Strawberry forcefield",
  //         "artworkDescription": "Water based paint (gouache or acrylics) and oil or soft pastel on paper.",
  //         "naturalSize": {
  //           "naturalWidth": 1543,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 11,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/strawberry-forcefield-desktop.jpg",
  //         "mobilePath": "uploads/mobile/strawberry-forcefield-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/strawberry-forcefield-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "sundown.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "graphics"
  //           ],
  //           "listitems": [
  //             "cg"
  //           ],
  //           "themes": [
  //             "weather",
  //             "celestial body",
  //             "acephale",
  //             "days"
  //           ],
  //           "year": "2019",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Sundown",
  //         "displayMain": true,
  //         "themes": [
  //           "weather",
  //           "celestial body",
  //           "acephale",
  //           "days"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2019",
  //         "_id": "5e0e6b85208f711970b73984",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "cg"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/sundown.jpg",
  //         "fileName": "sundown.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A female figure facing the setting sun by sea. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 595,
  //           "naturalHeight": 338
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/sundown-desktop.jpg",
  //         "mobilePath": "uploads/mobile/sundown-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/sundown-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "trampled.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "graphics",
  //             "painting"
  //           ],
  //           "listitems": [
  //             "drawing"
  //           ],
  //           "themes": [
  //             "metal",
  //             "frame"
  //           ],
  //           "year": "2018",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": true,
  //         "themes": [
  //           "metal",
  //           "frame"
  //         ],
  //         "seeAlso": [
  //           "malonioji_3.jpg",
  //           "north_1.jpg"
  //         ],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5df2d17640edab1940975b3b",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "drawing"
  //             ],
  //             "painting": []
  //           }
  //         },
  //         "filePath": "uploads/trampled.jpg",
  //         "fileName": "trampled.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": "Trampled by maggot ",
  //         "artworkDescription": "On a tip tray",
  //         "naturalSize": {
  //           "naturalWidth": 1092,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/trampled-desktop.jpg",
  //         "mobilePath": "uploads/mobile/trampled-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/trampled-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "tumblr_m1rb2rhvez1rsi2gco2_1280.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "public"
  //           ],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [
  //             "furniture"
  //           ],
  //           "year": "2011",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Pagalys",
  //         "displayMain": false,
  //         "themes": [
  //           "furniture"
  //         ],
  //         "seeAlso": [
  //           "malonioji_4.jpg"
  //         ],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2011",
  //         "_id": "5dfa7d88061ab618f4ee6be8",
  //         "category": {
  //           "medium": {
  //             "sculpture": []
  //           },
  //           "public": {
  //             "other": []
  //           }
  //         },
  //         "filePath": "uploads/tumblr_m1rb2rhvez1rsi2gco2_1280.jpg",
  //         "fileName": "tumblr_m1rb2rhvez1rsi2gco2_1280.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 720,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/tumblr_m1rb2rhvez1rsi2gco2_1280-desktop.jpg",
  //         "mobilePath": "uploads/mobile/tumblr_m1rb2rhvez1rsi2gco2_1280-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/tumblr_m1rb2rhvez1rsi2gco2_1280-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "tumblr_m1rb2rhvez1rsi2gco3_1280.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture",
  //             "other"
  //           ],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Pagalys",
  //         "displayMain": null,
  //         "themes": [
  //           "furniture"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2011",
  //         "_id": "5dfa7d88061ab618f4ee6be9",
  //         "category": {
  //           "medium": {
  //             "sculpture": []
  //           },
  //           "public": {
  //             "other": []
  //           }
  //         },
  //         "filePath": "uploads/tumblr_m1rb2rhvez1rsi2gco3_1280.jpg",
  //         "fileName": "tumblr_m1rb2rhvez1rsi2gco3_1280.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1621,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/tumblr_m1rb2rhvez1rsi2gco3_1280-desktop.jpg",
  //         "mobilePath": "uploads/mobile/tumblr_m1rb2rhvez1rsi2gco3_1280-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/tumblr_m1rb2rhvez1rsi2gco3_1280-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "Untitled31.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "photo"
  //           ],
  //           "listitems": [
  //             "b/w"
  //           ],
  //           "themes": [
  //             "social"
  //           ],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Lorenzo",
  //         "displayMain": null,
  //         "themes": [
  //           "social"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa7981de6a352340297e3d",
  //         "category": {
  //           "medium": {
  //             "photo": [
  //               "b/w"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/Untitled31.jpg",
  //         "fileName": "Untitled31.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "I ask my two friends and coworkers, both named Lorenzo, to act as models in a couple of scenes. Photographed by Rowan Wigley.",
  //         "artworkTitle": "Fever",
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1552,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/Untitled31-desktop.jpg",
  //         "mobilePath": "uploads/mobile/Untitled31-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/Untitled31-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "Untitled32.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Lorenzo",
  //         "displayMain": false,
  //         "themes": [
  //           "social"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa7981de6a352340297e3e",
  //         "category": {
  //           "medium": {
  //             "photo": [
  //               "b/w"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/Untitled32.jpg",
  //         "fileName": "Untitled32.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "I ask my two friends and coworkers, both named Lorenzo, to act as models in a couple of scenes. Photographed by Rowan Wigley.",
  //         "artworkTitle": "Fever",
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1617,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 3,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/Untitled32-desktop.jpg",
  //         "mobilePath": "uploads/mobile/Untitled32-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/Untitled32-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "Untitled42.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "photo"
  //           ],
  //           "listitems": [
  //             "b/w"
  //           ],
  //           "themes": [
  //             "restaurant"
  //           ],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Lorenzo",
  //         "displayMain": true,
  //         "themes": [
  //           "social",
  //           "restaurant"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa7981de6a352340297e3f",
  //         "category": {
  //           "medium": {
  //             "photo": [
  //               "b/w"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/Untitled42.jpg",
  //         "fileName": "Untitled42.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "I ask my two friends and coworkers, both named Lorenzo, to act as models in a couple of scenes. Photographed by Rowan Wigley.",
  //         "artworkTitle": "Hospitality",
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1650,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/Untitled42-desktop.jpg",
  //         "mobilePath": "uploads/mobile/Untitled42-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/Untitled42-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "Untitled54.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [
  //             "social"
  //           ],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Lorenzo",
  //         "displayMain": null,
  //         "themes": [
  //           "social",
  //           "restaurant"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa7981de6a352340297e40",
  //         "category": {
  //           "medium": {
  //             "photo": [
  //               "b/w"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/Untitled54.jpg",
  //         "fileName": "Untitled54.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "I ask my two friends and coworkers, both named Lorenzo, to act as models in a couple of scenes. Photographed by Rowan Wigley.",
  //         "artworkTitle": "Hospitality",
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1673,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/Untitled54-desktop.jpg",
  //         "mobilePath": "uploads/mobile/Untitled54-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/Untitled54-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "upe5.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium",
  //             "public"
  //           ],
  //           "subcategory": [
  //             "photo",
  //             "other"
  //           ],
  //           "listitems": [
  //             "b/w"
  //           ],
  //           "themes": [],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Beach service",
  //         "displayMain": true,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa7d0a061ab618f4ee6be6",
  //         "category": {
  //           "medium": {
  //             "photo": [
  //               "b/w"
  //             ]
  //           },
  //           "public": {
  //             "other": []
  //           }
  //         },
  //         "filePath": "uploads/upe5.jpg",
  //         "fileName": "upe5.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Clearing a rocky Thames beach at Surrey Quays, London.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1620,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/upe5-desktop.jpg",
  //         "mobilePath": "uploads/mobile/upe5-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/upe5-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "upe6.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium",
  //             "public"
  //           ],
  //           "subcategory": [
  //             "photo",
  //             "other"
  //           ],
  //           "listitems": [
  //             "b/w"
  //           ],
  //           "themes": [],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Beach service",
  //         "displayMain": null,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa7d0a061ab618f4ee6be5",
  //         "category": {
  //           "medium": {
  //             "photo": [
  //               "b/w"
  //             ]
  //           },
  //           "public": {
  //             "other": []
  //           }
  //         },
  //         "filePath": "uploads/upe6.jpg",
  //         "fileName": "upe6.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Clearing a rocky Thames beach at Surrey Quays, London.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1620,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/upe6-desktop.jpg",
  //         "mobilePath": "uploads/mobile/upe6-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/upe6-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "velniai_1.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "velniai",
  //         "displayMain": false,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2016",
  //         "_id": "5dfa66e3de6a352340297e13",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "ceramics"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/velniai_1.jpg",
  //         "fileName": "velniai_1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 540,
  //           "naturalHeight": 720
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/velniai_1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/velniai_1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/velniai_1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "velniai_2.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [],
  //           "listitems": [
  //             "ceramics"
  //           ],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "velniai",
  //         "displayMain": null,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2016",
  //         "_id": "5dfa66e3de6a352340297e14",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "ceramics"
  //             ]
  //           },
  //           "studio": {
  //             "studio": [],
  //             "wip": [
  //               "progress"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/velniai_2.jpg",
  //         "fileName": "velniai_2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 540,
  //           "naturalHeight": 720
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/velniai_2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/velniai_2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/velniai_2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "velniai_wip.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "studio",
  //             "wip"
  //           ],
  //           "listitems": [
  //             "progress"
  //           ],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "velniai",
  //         "displayMain": null,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2016",
  //         "_id": "5dfa66e3de6a352340297e15",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "ceramics"
  //             ],
  //             "graphics": [
  //               "cg"
  //             ]
  //           },
  //           "studio": {
  //             "wip": [
  //               "progress"
  //             ],
  //             "studio": []
  //           }
  //         },
  //         "filePath": "uploads/velniai_wip.jpg",
  //         "fileName": "velniai_wip.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 720,
  //           "naturalHeight": 644
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/velniai_wip-desktop.jpg",
  //         "mobilePath": "uploads/mobile/velniai_wip-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/velniai_wip-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "vignette-2.png": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [
  //             "graphics"
  //           ],
  //           "listitems": [
  //             "cg"
  //           ],
  //           "themes": [
  //             "social"
  //           ],
  //           "year": "2016",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Vignette",
  //         "displayMain": false,
  //         "themes": [
  //           "social"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2016",
  //         "_id": "5e0e5504208f711970b73976",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "cg"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/vignette-2.png",
  //         "fileName": "vignette-2.png",
  //         "fileType": "image/png",
  //         "familyDescription": "Digital collages put together for a show Darai ką turi daryti (You gotta do what you gotta do). Ended up not being used in the exhibition. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1080,
  //           "naturalHeight": 763
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/vignette-2-desktop.png",
  //         "mobilePath": "uploads/mobile/vignette-2-mob.png",
  //         "thumbnailPath": "uploads/thumbnails/vignette-2-thumbnail.png",
  //         "useFamilySetup": false
  //       },
  //       "vignette-3.png": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Vignette",
  //         "displayMain": null,
  //         "themes": [
  //           "social"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2016",
  //         "_id": "5e0e5504208f711970b73977",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "cg"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/vignette-3.png",
  //         "fileName": "vignette-3.png",
  //         "fileType": "image/png",
  //         "familyDescription": "Digital collages put together for a show Darai ką turi daryti (You gotta do what you gotta do). Ended up not being used in the exhibition. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1080,
  //           "naturalHeight": 763
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/vignette-3-desktop.png",
  //         "mobilePath": "uploads/mobile/vignette-3-mob.png",
  //         "thumbnailPath": "uploads/thumbnails/vignette-3-thumbnail.png",
  //         "useFamilySetup": false
  //       },
  //       "vignette1.png": {
  //         "displayTriggers": {
  //           "category": [
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "misc"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "social",
  //             "cards"
  //           ],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Vignette",
  //         "displayMain": null,
  //         "themes": [
  //           "social",
  //           "cards"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2016",
  //         "_id": "5e0e5504208f711970b73978",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "cg"
  //             ]
  //           },
  //           "studio": {
  //             "misc": []
  //           }
  //         },
  //         "filePath": "uploads/vignette1.png",
  //         "fileName": "vignette1.png",
  //         "fileType": "image/png",
  //         "familyDescription": "Digital collages put together for a show Darai ką turi daryti (You gotta do what you gotta do). Ended up not being used in the exhibition. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 3508,
  //           "naturalHeight": 2480
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/vignette1-desktop.png",
  //         "mobilePath": "uploads/mobile/vignette1-mob.png",
  //         "thumbnailPath": "uploads/thumbnails/vignette1-thumbnail.png",
  //         "useFamilySetup": false
  //       },
  //       "wizard-and-his-scholar.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "painting"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "social",
  //             "connected spheres",
  //             "crescent"
  //           ],
  //           "year": "2015",
  //           "location": "Coldbath street, London, UK"
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": false,
  //         "themes": [
  //           "social",
  //           "connected spheres",
  //           "crescent"
  //         ],
  //         "seeAlso": [
  //           "crescentBoxing.jpg"
  //         ],
  //         "location": "Coldbath street, London, UK",
  //         "year": "2015",
  //         "_id": "5df6d83b266b6a2cf4384b65",
  //         "category": {
  //           "medium": {
  //             "painting": []
  //           }
  //         },
  //         "filePath": "uploads/wizard-and-his-scholar.jpg",
  //         "fileName": "wizard-and-his-scholar.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": "Wizard and his scholar",
  //         "artworkDescription": "Found board, utility paint (white), markers, blue oil paint or oil pastel. ",
  //         "naturalSize": {
  //           "naturalWidth": 956,
  //           "naturalHeight": 677
  //         },
  //         "familyDisplayIndex": 12,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/wizard-and-his-scholar-desktop.jpg",
  //         "mobilePath": "uploads/mobile/wizard-and-his-scholar-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/wizard-and-his-scholar-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "woodblock-1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [
  //             "other"
  //           ],
  //           "themes": [],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Woodblock",
  //         "displayMain": true,
  //         "themes": [
  //           "acephale"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5e0a5f5b7d57c70eb872ee8e",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "other"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/woodblock-1.jpg",
  //         "fileName": "woodblock-1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 720,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/woodblock-1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/woodblock-1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/woodblock-1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "woodblock-2.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Woodblock",
  //         "displayMain": null,
  //         "themes": [
  //           "acephale"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5e0a5f5b7d57c70eb872ee8f",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "other"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/woodblock-2.jpg",
  //         "fileName": "woodblock-2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 720,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/woodblock-2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/woodblock-2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/woodblock-2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "woodblock-3.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [
  //             "acephale"
  //           ],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Woodblock",
  //         "displayMain": null,
  //         "themes": [
  //           "acephale"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5e0a5f5b7d57c70eb872ee90",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "other"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/woodblock-3.jpg",
  //         "fileName": "woodblock-3.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 3456,
  //           "naturalHeight": 5184
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/woodblock-3-desktop.jpg",
  //         "mobilePath": "uploads/mobile/woodblock-3-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/woodblock-3-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "woodblock-4.JPG": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [
  //             "misc"
  //           ],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Woodblock",
  //         "displayMain": null,
  //         "themes": [
  //           "acephale"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5e0a5f5b7d57c70eb872ee91",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "other"
  //             ]
  //           },
  //           "studio": {
  //             "misc": []
  //           }
  //         },
  //         "filePath": "uploads/woodblock-4.JPG",
  //         "fileName": "woodblock-4.JPG",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 3456,
  //           "naturalHeight": 5184
  //         },
  //         "familyDisplayIndex": 3,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/woodblock-4-desktop.JPG",
  //         "mobilePath": "uploads/mobile/woodblock-4-mob.JPG",
  //         "thumbnailPath": "uploads/thumbnails/woodblock-4-thumbnail.JPG",
  //         "useFamilySetup": false
  //       },
  //       "woodblock-5.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "misc"
  //           ],
  //           "listitems": [],
  //           "themes": [],
  //           "year": null,
  //           "location": null
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": null,
  //         "themes": [],
  //         "seeAlso": [
  //           "woodblock-2.jpg"
  //         ],
  //         "location": null,
  //         "year": null,
  //         "_id": "5e0a601d7d57c70eb872ee92",
  //         "category": {
  //           "studio": {
  //             "misc": []
  //           }
  //         },
  //         "filePath": "uploads/woodblock-5.jpg",
  //         "fileName": "woodblock-5.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1467,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 17,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/woodblock-5-desktop.jpg",
  //         "mobilePath": "uploads/mobile/woodblock-5-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/woodblock-5-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "WP_20150806_004.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Restaurant",
  //         "displayMain": true,
  //         "themes": [
  //           "restaurant",
  //           "tools"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa7f26061ab618f4ee6bef",
  //         "category": {
  //           "studio": {
  //             "misc": []
  //           }
  //         },
  //         "filePath": "uploads/WP_20150806_004.jpg",
  //         "fileName": "WP_20150806_004.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Service trays arranged on restaurant furniture. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 607,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/WP_20150806_004-desktop.jpg",
  //         "mobilePath": "uploads/mobile/WP_20150806_004-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/WP_20150806_004-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "WP_20150806_007.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [
  //             "misc"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "restaurant",
  //             "tools"
  //           ],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Restaurant",
  //         "displayMain": true,
  //         "themes": [
  //           "restaurant",
  //           "tools"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa7f26061ab618f4ee6bee",
  //         "category": {
  //           "studio": {
  //             "misc": []
  //           }
  //         },
  //         "filePath": "uploads/WP_20150806_007.jpg",
  //         "fileName": "WP_20150806_007.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Service trays arranged on restaurant furniture. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 607,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/WP_20150806_007-desktop.jpg",
  //         "mobilePath": "uploads/mobile/WP_20150806_007-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/WP_20150806_007-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "WP_20180421_18_00_14_Pro.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "metal"
  //           ],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Mushroom",
  //         "displayMain": null,
  //         "themes": [
  //           "metal"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5e0a0b7c9ed2212d5071767f",
  //         "category": {
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/WP_20180421_18_00_14_Pro.jpg",
  //         "fileName": "WP_20180421_18_00_14_Pro.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 608,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/WP_20180421_18_00_14_Pro-desktop.jpg",
  //         "mobilePath": "uploads/mobile/WP_20180421_18_00_14_Pro-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/WP_20180421_18_00_14_Pro-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "WP_20180421_18_00_35_Pro.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "metal"
  //           ],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Mushroom",
  //         "displayMain": null,
  //         "themes": [
  //           "metal"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5e0a0b7c9ed2212d50717680",
  //         "category": {
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/WP_20180421_18_00_35_Pro.jpg",
  //         "fileName": "WP_20180421_18_00_35_Pro.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 608,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/WP_20180421_18_00_35_Pro-desktop.jpg",
  //         "mobilePath": "uploads/mobile/WP_20180421_18_00_35_Pro-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/WP_20180421_18_00_35_Pro-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "youdo1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "public"
  //           ],
  //           "subcategory": [
  //             "exhibitions"
  //           ],
  //           "listitems": [
  //             "gotta do",
  //             "print material"
  //           ],
  //           "themes": [],
  //           "year": "2016",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "You gotta do what you gotta do",
  //         "displayMain": true,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2016",
  //         "_id": "5e0e6296208f711970b7397b",
  //         "category": {
  //           "public": {
  //             "exhibitions": [
  //               "gotta do"
  //             ]
  //           },
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/youdo1.jpg",
  //         "fileName": "youdo1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "An exhibition I put together with two of my friends (Jacob Bates-Firth and Sophia Freeman), taking personal materials we shared with each other over social networks and sticking them up on walls with tape or displaying them as videos on screens. \n\nhttps://daraikaturidaryti.tumblr.com/",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1440,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/youdo1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/youdo1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/youdo1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "youdo2-0.JPG": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "You gotta do what you gotta do",
  //         "displayMain": null,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2016",
  //         "_id": "5e0e6297208f711970b73981",
  //         "category": {
  //           "public": {
  //             "exhibitions": [
  //               "gotta do"
  //             ]
  //           },
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/youdo2-0.JPG",
  //         "fileName": "youdo2-0.JPG",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "An exhibition I put together with two of my friends (Jacob Bates-Firth and Sophia Freeman), taking personal materials we shared with each other over social networks and sticking them up on walls with tape or displaying them as videos on screens. \n\nhttps://daraikaturidaryti.tumblr.com/",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 4288,
  //           "naturalHeight": 3216
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/youdo2-0-desktop.JPG",
  //         "mobilePath": "uploads/mobile/youdo2-0-mob.JPG",
  //         "thumbnailPath": "uploads/thumbnails/youdo2-0-thumbnail.JPG",
  //         "useFamilySetup": false
  //       },
  //       "youdo2-3.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "You gotta do what you gotta do",
  //         "displayMain": null,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2016",
  //         "_id": "5e0e6296208f711970b7397a",
  //         "category": {
  //           "public": {
  //             "exhibitions": [
  //               "gotta do"
  //             ]
  //           },
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/youdo2-3.jpg",
  //         "fileName": "youdo2-3.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "An exhibition I put together with two of my friends (Jacob Bates-Firth and Sophia Freeman), taking personal materials we shared with each other over social networks and sticking them up on walls with tape or displaying them as videos on screens. \n\nhttps://daraikaturidaryti.tumblr.com/",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1924,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 6,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/youdo2-3-desktop.jpg",
  //         "mobilePath": "uploads/mobile/youdo2-3-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/youdo2-3-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "youdo4-0.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "public"
  //           ],
  //           "subcategory": [
  //             "exhibitions"
  //           ],
  //           "listitems": [
  //             "gotta do"
  //           ],
  //           "themes": [],
  //           "year": "2016",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "You gotta do what you gotta do",
  //         "displayMain": null,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2016",
  //         "_id": "5e0e6297208f711970b7397c",
  //         "category": {
  //           "public": {
  //             "exhibitions": [
  //               "gotta do"
  //             ]
  //           },
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/youdo4-0.jpg",
  //         "fileName": "youdo4-0.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "An exhibition I put together with two of my friends (Jacob Bates-Firth and Sophia Freeman), taking personal materials we shared with each other over social networks and sticking them up on walls with tape or displaying them as videos on screens. \n\nhttps://daraikaturidaryti.tumblr.com/",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1620,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/youdo4-0-desktop.jpg",
  //         "mobilePath": "uploads/mobile/youdo4-0-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/youdo4-0-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "youdo5.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "You gotta do what you gotta do",
  //         "displayMain": null,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2016",
  //         "_id": "5e0e6297208f711970b73980",
  //         "category": {
  //           "public": {
  //             "exhibitions": [
  //               "gotta do"
  //             ]
  //           },
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/youdo5.jpg",
  //         "fileName": "youdo5.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "An exhibition I put together with two of my friends (Jacob Bates-Firth and Sophia Freeman), taking personal materials we shared with each other over social networks and sticking them up on walls with tape or displaying them as videos on screens. \n\nhttps://daraikaturidaryti.tumblr.com/",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1620,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 3,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/youdo5-desktop.jpg",
  //         "mobilePath": "uploads/mobile/youdo5-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/youdo5-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "youdo6.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "_archive",
  //         "displayMain": null,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "",
  //         "year": "",
  //         "_id": "5e0e6297208f711970b7397e",
  //         "category": {
  //           "studio": {
  //             "misc": []
  //           }
  //         },
  //         "filePath": "uploads/youdo6.jpg",
  //         "fileName": "youdo6.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1440,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 3,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/youdo6-desktop.jpg",
  //         "mobilePath": "uploads/mobile/youdo6-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/youdo6-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "youdo8-0.JPG": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "_archive",
  //         "displayMain": null,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "",
  //         "year": "",
  //         "_id": "5e0e6297208f711970b73982",
  //         "category": {
  //           "studio": {
  //             "misc": []
  //           }
  //         },
  //         "filePath": "uploads/youdo8-0.JPG",
  //         "fileName": "youdo8-0.JPG",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 4288,
  //           "naturalHeight": 3216
  //         },
  //         "familyDisplayIndex": 5,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/youdo8-0-desktop.JPG",
  //         "mobilePath": "uploads/mobile/youdo8-0-mob.JPG",
  //         "thumbnailPath": "uploads/thumbnails/youdo8-0-thumbnail.JPG",
  //         "useFamilySetup": false
  //       },
  //       "youdo9-0.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium",
  //             "public"
  //           ],
  //           "subcategory": [
  //             "graphics"
  //           ],
  //           "listitems": [
  //             "print material",
  //             "gotta do"
  //           ],
  //           "themes": [],
  //           "year": "2016",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "You gotta do what you gotta do",
  //         "displayMain": null,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2016",
  //         "_id": "5e0e6297208f711970b7397d",
  //         "category": {
  //           "public": {
  //             "exhibitions": [
  //               "gotta do"
  //             ]
  //           },
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/youdo9-0.jpg",
  //         "fileName": "youdo9-0.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "An exhibition I put together with two of my friends (Jacob Bates-Firth and Sophia Freeman), taking personal materials we shared with each other over social networks and sticking them up on walls with tape or displaying them as videos on screens. \n\nhttps://daraikaturidaryti.tumblr.com/",
  //         "artworkTitle": null,
  //         "artworkDescription": "Poster to the show.",
  //         "naturalSize": {
  //           "naturalWidth": 1528,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 4,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/youdo9-0-desktop.jpg",
  //         "mobilePath": "uploads/mobile/youdo9-0-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/youdo9-0-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "youdo9-1.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "You gotta do what you gotta do",
  //         "displayMain": true,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2016",
  //         "_id": "5e0e6297208f711970b7397f",
  //         "category": {
  //           "public": {
  //             "exhibitions": [
  //               "gotta do"
  //             ]
  //           },
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/youdo9-1.jpg",
  //         "fileName": "youdo9-1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "An exhibition I put together with two of my friends (Jacob Bates-Firth and Sophia Freeman), taking personal materials we shared with each other over social networks and sticking them up on walls with tape or displaying them as videos on screens. \n\nhttps://daraikaturidaryti.tumblr.com/",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1440,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 5,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/youdo9-1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/youdo9-1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/youdo9-1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       }
  //     },
  //     "yearLocation": {
  //       "years": [
  //         "2011",
  //         "2012",
  //         "2013",
  //         "2014",
  //         "2015",
  //         "2016",
  //         "2017",
  //         "2018",
  //         "2019"
  //       ],
  //       "locations": [
  //         "Coldbath street, London, UK",
  //         "London, UK",
  //         "Panevėžys, Lithuania",
  //         "Vilnius, Lithuania",
  //         "Warsaw, Poland",
  //         "Woolwich, London, UK"
  //       ],
  //       "visible": {
  //         "years": {
  //           "2011": [
  //             "person-on-bridge.png",
  //             "tumblr_m1rb2rhvez1rsi2gco2_1280.jpg",
  //             "tumblr_m1rb2rhvez1rsi2gco3_1280.jpg"
  //           ],
  //           "2012": [
  //             "ash-and-chip.jpg",
  //             "chips-and-ash-on-snow.jpg",
  //             "chips3.jpg",
  //             "marker-and-ballpoint.jpg"
  //           ],
  //           "2013": [
  //             "assemblage_2.jpg",
  //             "assemblage_4.jpg",
  //             "chicken_leg_1.jpg",
  //             "chicken_leg_2.jpg",
  //             "detail_testciles_2.jpg",
  //             "james_print_1.jpg",
  //             "james_print_2.jpg",
  //             "siaudu_batai_1.jpg",
  //             "siaudu_batai_2.jpg"
  //           ],
  //           "2014": [
  //             "65710021.JPG",
  //             "buddy.jpg",
  //             "ghost_1.jpg",
  //             "ghost_2.jpg",
  //             "ghost_3.jpg",
  //             "jozin-1.jpg",
  //             "jozin-2.jpg",
  //             "jozin-3.jpg",
  //             "jozin-4.jpg",
  //             "jozin-5.jpg",
  //             "staircase-2-0.jpg",
  //             "staircase-2-00.jpg",
  //             "staircase-2-000.jpg",
  //             "staircase-2-1.jpg",
  //             "staircase-2-3.jpg",
  //             "staircase-2-4.jpg",
  //             "staircase-after-2.jpg",
  //             "staircase-after-3.jpg",
  //             "star_3.jpg",
  //             "star_4.jpg",
  //             "star_5.jpg",
  //             "Untitled31.jpg",
  //             "Untitled32.jpg",
  //             "Untitled42.jpg",
  //             "Untitled54.jpg",
  //             "upe5.jpg",
  //             "upe6.jpg",
  //             "woodblock-1.jpg",
  //             "woodblock-2.jpg",
  //             "woodblock-3.jpg",
  //             "woodblock-4.JPG",
  //             "WP_20150806_004.jpg",
  //             "WP_20150806_007.jpg"
  //           ],
  //           "2015": [
  //             "241.jpg",
  //             "alex.jpg",
  //             "crescentBoxing.jpg",
  //             "days2.jpg",
  //             "emo-sky.jpg",
  //             "hunter-half-life-2-episode-3.jpg",
  //             "james-2.jpg",
  //             "jonas-2.jpg",
  //             "jonas.jpg",
  //             "malonioji_1.jpg",
  //             "malonioji_2.jpg",
  //             "malonioji_3.jpg",
  //             "malonioji_4.jpg",
  //             "north_1.jpg",
  //             "north_2.jpg",
  //             "north_3.jpg",
  //             "rowan-2.jpg",
  //             "shitty-day.jpg",
  //             "shy-photos-1.jpg",
  //             "shy-photos-2.jpg",
  //             "shy-photos-3.jpg",
  //             "shy-photos-4.jpg",
  //             "shy-photos-5.jpg",
  //             "wizard-and-his-scholar.jpg"
  //           ],
  //           "2016": [
  //             "gradient0.jpg",
  //             "gradient2.jpg",
  //             "gradient7.jpg",
  //             "stage_kieme_1.jpg",
  //             "stage_kieme_2.jpg",
  //             "velniai_1.jpg",
  //             "velniai_2.jpg",
  //             "velniai_wip.jpg",
  //             "vignette-2.png",
  //             "vignette-3.png",
  //             "vignette1.png",
  //             "youdo1.jpg",
  //             "youdo2-0.JPG",
  //             "youdo2-3.jpg",
  //             "youdo4-0.jpg",
  //             "youdo5.jpg",
  //             "youdo9-0.jpg",
  //             "youdo9-1.jpg"
  //           ],
  //           "2017": [
  //             "20170723_120614.jpg",
  //             "apple-pig-close-up.jpg",
  //             "before-eyes-1.jpg",
  //             "before-eyes-2.jpg",
  //             "before-eyes-3.jpeg",
  //             "before-eyes.jpg",
  //             "connectedSpheres2.jpg",
  //             "DSC_7228.jpg",
  //             "kiss-0.jpg",
  //             "kiss-2.jpg",
  //             "kiss-3.jpg",
  //             "kiss4.jpg",
  //             "red-frame.jpg"
  //           ],
  //           "2018": [
  //             "bench-3.jpg",
  //             "bench-public-1.jpg",
  //             "bench-public-2.png",
  //             "bench1.jpg",
  //             "bench2.jpg",
  //             "buried-in-meat-2.jpg",
  //             "cherry1.jpg",
  //             "cherry2.jpg",
  //             "foot-with-handle-1.jpg",
  //             "foot-with-handle-2.jpg",
  //             "foot-with-handle-5.jpg",
  //             "hammerScrew.jpg",
  //             "mushroom-strawberry.jpg",
  //             "portrait.jpg",
  //             "strawberry-forcefield.jpg",
  //             "trampled.jpg",
  //             "WP_20180421_18_00_14_Pro.jpg",
  //             "WP_20180421_18_00_35_Pro.jpg"
  //           ],
  //           "2019": [
  //             "20190418_143219-2.jpg",
  //             "20191106_075914.jpg",
  //             "blue-frame-1.jpg",
  //             "blue-frame-2.jpg",
  //             "ceramic-stand-2.jpg",
  //             "ceramic-stand-3.jpg",
  //             "char-creation-1.jpg",
  //             "char-creation-2.jpg",
  //             "kolona.jpg",
  //             "mirror-shelf-1.jpg",
  //             "mirror-shelf-2.jpg",
  //             "sundown.jpg"
  //           ]
  //         },
  //         "locations": {
  //           "London, UK": [
  //             "20170723_120614.jpg",
  //             "65710021.JPG",
  //             "alex.jpg",
  //             "ash-and-chip.jpg",
  //             "assemblage_2.jpg",
  //             "assemblage_4.jpg",
  //             "buddy.jpg",
  //             "chips-and-ash-on-snow.jpg",
  //             "chips3.jpg",
  //             "days2.jpg",
  //             "detail_testciles_2.jpg",
  //             "ghost_1.jpg",
  //             "ghost_2.jpg",
  //             "ghost_3.jpg",
  //             "james-2.jpg",
  //             "james_print_1.jpg",
  //             "james_print_2.jpg",
  //             "jonas-2.jpg",
  //             "jonas.jpg",
  //             "jozin-1.jpg",
  //             "jozin-2.jpg",
  //             "jozin-3.jpg",
  //             "jozin-4.jpg",
  //             "jozin-5.jpg",
  //             "marker-and-ballpoint.jpg",
  //             "rowan-2.jpg",
  //             "shy-photos-1.jpg",
  //             "shy-photos-2.jpg",
  //             "shy-photos-3.jpg",
  //             "shy-photos-4.jpg",
  //             "shy-photos-5.jpg",
  //             "siaudu_batai_1.jpg",
  //             "siaudu_batai_2.jpg",
  //             "staircase-2-0.jpg",
  //             "staircase-2-00.jpg",
  //             "staircase-2-000.jpg",
  //             "staircase-2-1.jpg",
  //             "staircase-2-3.jpg",
  //             "staircase-2-4.jpg",
  //             "staircase-after-2.jpg",
  //             "staircase-after-3.jpg",
  //             "star_3.jpg",
  //             "star_4.jpg",
  //             "star_5.jpg",
  //             "Untitled31.jpg",
  //             "Untitled32.jpg",
  //             "Untitled42.jpg",
  //             "Untitled54.jpg",
  //             "upe5.jpg",
  //             "upe6.jpg",
  //             "woodblock-1.jpg",
  //             "woodblock-2.jpg",
  //             "woodblock-3.jpg",
  //             "woodblock-4.JPG",
  //             "WP_20150806_004.jpg",
  //             "WP_20150806_007.jpg"
  //           ],
  //           "Panevėžys, Lithuania": [
  //             "20190418_143219-2.jpg",
  //             "before-eyes-1.jpg",
  //             "bench-3.jpg",
  //             "bench-public-1.jpg",
  //             "bench-public-2.png",
  //             "bench1.jpg",
  //             "bench2.jpg",
  //             "blue-frame-1.jpg",
  //             "blue-frame-2.jpg",
  //             "buried-in-meat-2.jpg",
  //             "ceramic-stand-2.jpg",
  //             "ceramic-stand-3.jpg",
  //             "char-creation-1.jpg",
  //             "char-creation-2.jpg",
  //             "cherry1.jpg",
  //             "cherry2.jpg",
  //             "foot-with-handle-1.jpg",
  //             "foot-with-handle-2.jpg",
  //             "foot-with-handle-5.jpg",
  //             "gradient0.jpg",
  //             "gradient2.jpg",
  //             "gradient7.jpg",
  //             "hammerScrew.jpg",
  //             "kolona.jpg",
  //             "mirror-shelf-1.jpg",
  //             "mirror-shelf-2.jpg",
  //             "mushroom-strawberry.jpg",
  //             "person-on-bridge.png",
  //             "portrait.jpg",
  //             "stage_kieme_1.jpg",
  //             "stage_kieme_2.jpg",
  //             "strawberry-forcefield.jpg",
  //             "sundown.jpg",
  //             "trampled.jpg",
  //             "tumblr_m1rb2rhvez1rsi2gco2_1280.jpg",
  //             "tumblr_m1rb2rhvez1rsi2gco3_1280.jpg",
  //             "velniai_1.jpg",
  //             "velniai_2.jpg",
  //             "velniai_wip.jpg",
  //             "vignette-2.png",
  //             "vignette-3.png",
  //             "vignette1.png",
  //             "WP_20180421_18_00_14_Pro.jpg",
  //             "WP_20180421_18_00_35_Pro.jpg",
  //             "youdo1.jpg",
  //             "youdo2-0.JPG",
  //             "youdo2-3.jpg",
  //             "youdo4-0.jpg",
  //             "youdo5.jpg",
  //             "youdo9-0.jpg",
  //             "youdo9-1.jpg"
  //           ],
  //           "Warsaw, Poland": [
  //             "20191106_075914.jpg"
  //           ],
  //           "Coldbath street, London, UK": [
  //             "241.jpg",
  //             "crescentBoxing.jpg",
  //             "emo-sky.jpg",
  //             "hunter-half-life-2-episode-3.jpg",
  //             "north_1.jpg",
  //             "north_2.jpg",
  //             "north_3.jpg",
  //             "shitty-day.jpg",
  //             "wizard-and-his-scholar.jpg"
  //           ],
  //           "Woolwich, London, UK": [
  //             "apple-pig-close-up.jpg",
  //             "before-eyes-2.jpg",
  //             "before-eyes-3.jpeg",
  //             "before-eyes.jpg",
  //             "connectedSpheres2.jpg",
  //             "DSC_7228.jpg",
  //             "kiss-0.jpg",
  //             "kiss-2.jpg",
  //             "kiss-3.jpg",
  //             "kiss4.jpg",
  //             "red-frame.jpg"
  //           ],
  //           "Vilnius, Lithuania": [
  //             "malonioji_1.jpg",
  //             "malonioji_2.jpg",
  //             "malonioji_3.jpg",
  //             "malonioji_4.jpg"
  //           ]
  //         }
  //       },
  //       "all": {
  //         "years": {
  //           "2011": [
  //             "person-on-bridge.png",
  //             "tumblr_m1rb2rhvez1rsi2gco2_1280.jpg",
  //             "tumblr_m1rb2rhvez1rsi2gco3_1280.jpg"
  //           ],
  //           "2012": [
  //             "ash-and-chip.jpg",
  //             "chips-and-ash-on-snow.jpg",
  //             "chips3.jpg",
  //             "marker-and-ballpoint.jpg"
  //           ],
  //           "2013": [
  //             "assemblage_2.jpg",
  //             "assemblage_4.jpg",
  //             "chicken_leg_1.jpg",
  //             "chicken_leg_2.jpg",
  //             "detail_testciles_2.jpg",
  //             "james_print_1.jpg",
  //             "james_print_2.jpg",
  //             "siaudu_batai_1.jpg",
  //             "siaudu_batai_2.jpg"
  //           ],
  //           "2014": [
  //             "65710021.JPG",
  //             "buddy.jpg",
  //             "ghost_1.jpg",
  //             "ghost_2.jpg",
  //             "ghost_3.jpg",
  //             "jozin-1.jpg",
  //             "jozin-2.jpg",
  //             "jozin-3.jpg",
  //             "jozin-4.jpg",
  //             "jozin-5.jpg",
  //             "staircase-2-0.jpg",
  //             "staircase-2-00.jpg",
  //             "staircase-2-000.jpg",
  //             "staircase-2-1.jpg",
  //             "staircase-2-3.jpg",
  //             "staircase-2-4.jpg",
  //             "staircase-after-2.jpg",
  //             "staircase-after-3.jpg",
  //             "star_3.jpg",
  //             "star_4.jpg",
  //             "star_5.jpg",
  //             "Untitled31.jpg",
  //             "Untitled32.jpg",
  //             "Untitled42.jpg",
  //             "Untitled54.jpg",
  //             "upe5.jpg",
  //             "upe6.jpg",
  //             "woodblock-1.jpg",
  //             "woodblock-2.jpg",
  //             "woodblock-3.jpg",
  //             "woodblock-4.JPG",
  //             "WP_20150806_004.jpg",
  //             "WP_20150806_007.jpg"
  //           ],
  //           "2015": [
  //             "241.jpg",
  //             "alex.jpg",
  //             "crescentBoxing.jpg",
  //             "days2.jpg",
  //             "emo-sky.jpg",
  //             "hunter-half-life-2-episode-3.jpg",
  //             "james-2.jpg",
  //             "jonas-2.jpg",
  //             "jonas.jpg",
  //             "malonioji_1.jpg",
  //             "malonioji_2.jpg",
  //             "malonioji_3.jpg",
  //             "malonioji_4.jpg",
  //             "north_1.jpg",
  //             "north_2.jpg",
  //             "north_3.jpg",
  //             "rowan-2.jpg",
  //             "shitty-day.jpg",
  //             "shy-photos-1.jpg",
  //             "shy-photos-2.jpg",
  //             "shy-photos-3.jpg",
  //             "shy-photos-4.jpg",
  //             "shy-photos-5.jpg",
  //             "wizard-and-his-scholar.jpg"
  //           ],
  //           "2016": [
  //             "gradient0.jpg",
  //             "gradient2.jpg",
  //             "gradient7.jpg",
  //             "stage_kieme_1.jpg",
  //             "stage_kieme_2.jpg",
  //             "velniai_1.jpg",
  //             "velniai_2.jpg",
  //             "velniai_wip.jpg",
  //             "vignette-2.png",
  //             "vignette-3.png",
  //             "vignette1.png",
  //             "youdo1.jpg",
  //             "youdo2-0.JPG",
  //             "youdo2-3.jpg",
  //             "youdo4-0.jpg",
  //             "youdo5.jpg",
  //             "youdo9-0.jpg",
  //             "youdo9-1.jpg"
  //           ],
  //           "2017": [
  //             "20170723_120614.jpg",
  //             "apple-pig-close-up.jpg",
  //             "before-eyes-1.jpg",
  //             "before-eyes-2.jpg",
  //             "before-eyes-3.jpeg",
  //             "before-eyes.jpg",
  //             "connectedSpheres2.jpg",
  //             "DSC_7228.jpg",
  //             "kiss-0.jpg",
  //             "kiss-2.jpg",
  //             "kiss-3.jpg",
  //             "kiss4.jpg",
  //             "red-frame.jpg"
  //           ],
  //           "2018": [
  //             "bench-3.jpg",
  //             "bench-public-1.jpg",
  //             "bench-public-2.png",
  //             "bench1.jpg",
  //             "bench2.jpg",
  //             "buried-in-meat-2.jpg",
  //             "cherry1.jpg",
  //             "cherry2.jpg",
  //             "foot-with-handle-1.jpg",
  //             "foot-with-handle-2.jpg",
  //             "foot-with-handle-5.jpg",
  //             "hammerScrew.jpg",
  //             "mushroom-strawberry.jpg",
  //             "portrait.jpg",
  //             "strawberry-forcefield.jpg",
  //             "trampled.jpg",
  //             "WP_20180421_18_00_14_Pro.jpg",
  //             "WP_20180421_18_00_35_Pro.jpg"
  //           ],
  //           "2019": [
  //             "20190418_143219-2.jpg",
  //             "20191106_075914.jpg",
  //             "blue-frame-1.jpg",
  //             "blue-frame-2.jpg",
  //             "ceramic-stand-2.jpg",
  //             "ceramic-stand-3.jpg",
  //             "char-creation-1.jpg",
  //             "char-creation-2.jpg",
  //             "kolona.jpg",
  //             "mirror-shelf-1.jpg",
  //             "mirror-shelf-2.jpg",
  //             "sundown.jpg"
  //           ]
  //         },
  //         "locations": {
  //           "London, UK": [
  //             "20170723_120614.jpg",
  //             "65710021.JPG",
  //             "alex.jpg",
  //             "ash-and-chip.jpg",
  //             "assemblage_2.jpg",
  //             "assemblage_4.jpg",
  //             "buddy.jpg",
  //             "chips-and-ash-on-snow.jpg",
  //             "chips3.jpg",
  //             "days2.jpg",
  //             "detail_testciles_2.jpg",
  //             "ghost_1.jpg",
  //             "ghost_2.jpg",
  //             "ghost_3.jpg",
  //             "james-2.jpg",
  //             "james_print_1.jpg",
  //             "james_print_2.jpg",
  //             "jonas-2.jpg",
  //             "jonas.jpg",
  //             "jozin-1.jpg",
  //             "jozin-2.jpg",
  //             "jozin-3.jpg",
  //             "jozin-4.jpg",
  //             "jozin-5.jpg",
  //             "marker-and-ballpoint.jpg",
  //             "rowan-2.jpg",
  //             "shy-photos-1.jpg",
  //             "shy-photos-2.jpg",
  //             "shy-photos-3.jpg",
  //             "shy-photos-4.jpg",
  //             "shy-photos-5.jpg",
  //             "siaudu_batai_1.jpg",
  //             "siaudu_batai_2.jpg",
  //             "staircase-2-0.jpg",
  //             "staircase-2-00.jpg",
  //             "staircase-2-000.jpg",
  //             "staircase-2-1.jpg",
  //             "staircase-2-3.jpg",
  //             "staircase-2-4.jpg",
  //             "staircase-after-2.jpg",
  //             "staircase-after-3.jpg",
  //             "star_3.jpg",
  //             "star_4.jpg",
  //             "star_5.jpg",
  //             "Untitled31.jpg",
  //             "Untitled32.jpg",
  //             "Untitled42.jpg",
  //             "Untitled54.jpg",
  //             "upe5.jpg",
  //             "upe6.jpg",
  //             "woodblock-1.jpg",
  //             "woodblock-2.jpg",
  //             "woodblock-3.jpg",
  //             "woodblock-4.JPG",
  //             "WP_20150806_004.jpg",
  //             "WP_20150806_007.jpg"
  //           ],
  //           "Panevėžys, Lithuania": [
  //             "20190418_143219-2.jpg",
  //             "before-eyes-1.jpg",
  //             "bench-3.jpg",
  //             "bench-public-1.jpg",
  //             "bench-public-2.png",
  //             "bench1.jpg",
  //             "bench2.jpg",
  //             "blue-frame-1.jpg",
  //             "blue-frame-2.jpg",
  //             "buried-in-meat-2.jpg",
  //             "ceramic-stand-2.jpg",
  //             "ceramic-stand-3.jpg",
  //             "char-creation-1.jpg",
  //             "char-creation-2.jpg",
  //             "cherry1.jpg",
  //             "cherry2.jpg",
  //             "foot-with-handle-1.jpg",
  //             "foot-with-handle-2.jpg",
  //             "foot-with-handle-5.jpg",
  //             "gradient0.jpg",
  //             "gradient2.jpg",
  //             "gradient7.jpg",
  //             "hammerScrew.jpg",
  //             "kolona.jpg",
  //             "mirror-shelf-1.jpg",
  //             "mirror-shelf-2.jpg",
  //             "mushroom-strawberry.jpg",
  //             "person-on-bridge.png",
  //             "portrait.jpg",
  //             "stage_kieme_1.jpg",
  //             "stage_kieme_2.jpg",
  //             "strawberry-forcefield.jpg",
  //             "sundown.jpg",
  //             "trampled.jpg",
  //             "tumblr_m1rb2rhvez1rsi2gco2_1280.jpg",
  //             "tumblr_m1rb2rhvez1rsi2gco3_1280.jpg",
  //             "velniai_1.jpg",
  //             "velniai_2.jpg",
  //             "velniai_wip.jpg",
  //             "vignette-2.png",
  //             "vignette-3.png",
  //             "vignette1.png",
  //             "WP_20180421_18_00_14_Pro.jpg",
  //             "WP_20180421_18_00_35_Pro.jpg",
  //             "youdo1.jpg",
  //             "youdo2-0.JPG",
  //             "youdo2-3.jpg",
  //             "youdo4-0.jpg",
  //             "youdo5.jpg",
  //             "youdo9-0.jpg",
  //             "youdo9-1.jpg"
  //           ],
  //           "Warsaw, Poland": [
  //             "20191106_075914.jpg"
  //           ],
  //           "Coldbath street, London, UK": [
  //             "241.jpg",
  //             "crescentBoxing.jpg",
  //             "emo-sky.jpg",
  //             "hunter-half-life-2-episode-3.jpg",
  //             "north_1.jpg",
  //             "north_2.jpg",
  //             "north_3.jpg",
  //             "shitty-day.jpg",
  //             "wizard-and-his-scholar.jpg"
  //           ],
  //           "Woolwich, London, UK": [
  //             "apple-pig-close-up.jpg",
  //             "before-eyes-2.jpg",
  //             "before-eyes-3.jpeg",
  //             "before-eyes.jpg",
  //             "connectedSpheres2.jpg",
  //             "DSC_7228.jpg",
  //             "kiss-0.jpg",
  //             "kiss-2.jpg",
  //             "kiss-3.jpg",
  //             "kiss4.jpg",
  //             "red-frame.jpg"
  //           ],
  //           "Vilnius, Lithuania": [
  //             "malonioji_1.jpg",
  //             "malonioji_2.jpg",
  //             "malonioji_3.jpg",
  //             "malonioji_4.jpg"
  //           ]
  //         }
  //       }
  //     },
  //     "artworkOnDisplay": {
  //       "bench-public-2.png": {
  //         "displayTriggers": {
  //           "category": [
  //             "public",
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture",
  //             "other"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "furniture",
  //             "social"
  //           ],
  //           "year": "2018",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Bench",
  //         "displayMain": true,
  //         "themes": [
  //           "furniture",
  //           "social"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5df6cef8266b6a2cf4384b55",
  //         "category": {
  //           "public": {
  //             "other": []
  //           },
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/bench-public-2.png",
  //         "fileName": "bench-public-2.png",
  //         "fileType": "image/png",
  //         "familyDescription": "In 2018 I attended a professional training programme. The atmosphere felt oppressive. I made this bench, brought it over to school and chained it around a column. It has two modes: bench and ashtray (made from groin protector). The building security (male) approached me as soon as I entered the building and asked if I had permission chain down the bench. I, aggro-defensively, lied that I had. Later I had to speak to the director of the school (female), to whom I presented the bench as a public benefit and so the bench stayed. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 990,
  //           "naturalHeight": 562
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/bench-public-2-desktop.png",
  //         "mobilePath": "uploads/mobile/bench-public-2-mob.png",
  //         "thumbnailPath": "uploads/thumbnails/bench-public-2-thumbnail.png",
  //         "useFamilySetup": false
  //       },
  //       "chicken_leg_2.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "metal",
  //             "support"
  //           ],
  //           "year": "2013",
  //           "location": ""
  //         },
  //         "artworkFamily": "Chicken leg",
  //         "displayMain": true,
  //         "themes": [
  //           "metal",
  //           "support"
  //         ],
  //         "seeAlso": [
  //           "foot-with-handle-1.jpg"
  //         ],
  //         "location": "",
  //         "year": "2013",
  //         "_id": "5dfa67aede6a352340297e19",
  //         "category": {
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/chicken_leg_2.jpg",
  //         "fileName": "chicken_leg_2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1618,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/chicken_leg_2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/chicken_leg_2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/chicken_leg_2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "days2.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "days",
  //             "metal"
  //           ],
  //           "year": "2015",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Days",
  //         "displayMain": true,
  //         "themes": [
  //           "days",
  //           "metal"
  //         ],
  //         "seeAlso": [
  //           "WP_20150806_004.jpg",
  //           "WP_20150806_007.jpg"
  //         ],
  //         "location": "London, UK",
  //         "year": "2015",
  //         "_id": "5df6cfe7266b6a2cf4384b58",
  //         "category": {
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/days2.jpg",
  //         "fileName": "days2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 607,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/days2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/days2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/days2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "foot-with-handle-2.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [
  //             "ceramics",
  //             "plaster"
  //           ],
  //           "themes": [
  //             "tools"
  //           ],
  //           "year": "2018",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Foot with a handle",
  //         "displayMain": true,
  //         "themes": [
  //           "tools"
  //         ],
  //         "seeAlso": [
  //           "chicken_leg_2.jpg",
  //           "kolona.jpg"
  //         ],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5e0a137d9ed2212d50717693",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "ceramics",
  //               "plaster"
  //             ]
  //           },
  //           "studio": {
  //             "wip": []
  //           }
  //         },
  //         "filePath": "uploads/foot-with-handle-2.jpg",
  //         "fileName": "foot-with-handle-2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A clay or plaster (cast) foot propped on various furniture handles. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1459,
  //           "naturalHeight": 2593
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/foot-with-handle-2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/foot-with-handle-2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/foot-with-handle-2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "ghost_2.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [
  //             "plaster"
  //           ],
  //           "themes": [
  //             "metal"
  //           ],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Ghost",
  //         "displayMain": true,
  //         "themes": [
  //           "metal"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa69b1de6a352340297e26",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "plaster"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/ghost_2.jpg",
  //         "fileName": "ghost_2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 720,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/ghost_2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/ghost_2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/ghost_2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "hammerScrew.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium",
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "graphics",
  //             "wip"
  //           ],
  //           "listitems": [
  //             "drawing",
  //             "sketches"
  //           ],
  //           "themes": [
  //             "acephale",
  //             "tools"
  //           ],
  //           "year": "2018",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Hammer screw",
  //         "displayMain": true,
  //         "themes": [
  //           "acephale",
  //           "tools"
  //         ],
  //         "seeAlso": [
  //           "gradient0.jpg"
  //         ],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5df2d0b040edab1940975b3a",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "drawing"
  //             ]
  //           },
  //           "studio": {
  //             "wip": [
  //               "sketches"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/hammerScrew.jpg",
  //         "fileName": "hammerScrew.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": "Hammer screw",
  //         "naturalSize": {
  //           "naturalWidth": 767,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/hammerScrew-desktop.jpg",
  //         "mobilePath": "uploads/mobile/hammerScrew-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/hammerScrew-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "james_print_1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "graphics",
  //             "photo"
  //           ],
  //           "listitems": [
  //             "print material",
  //             "color"
  //           ],
  //           "themes": [
  //             "social",
  //             "fruit"
  //           ],
  //           "year": "2013",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "James' print",
  //         "displayMain": true,
  //         "themes": [
  //           "social",
  //           "fruit"
  //         ],
  //         "seeAlso": [
  //           "james-1.jpg",
  //           "james-2.jpg"
  //         ],
  //         "location": "London, UK",
  //         "year": "2013",
  //         "_id": "5dfa76b9de6a352340297e38",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ],
  //             "photo": [
  //               "color"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/james_print_1.jpg",
  //         "fileName": "james_print_1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "I attended a dinner party and brought a bouquet of cabbage leaves and a banana. I asked the host to photograph it, print it and leave the photograph in my studio as we were course mates. He complied, but on reverse left a note. I asked to cross that out and return once that is done. ",
  //         "artworkTitle": null,
  //         "artworkDescription": "An enlarged print of this image featured in a self-organized display of posters in a staircase of a social estate in London, UK.",
  //         "naturalSize": {
  //           "naturalWidth": 716,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/james_print_1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/james_print_1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/james_print_1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "mushroom-strawberry.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "metal"
  //           ],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Mushroom",
  //         "displayMain": true,
  //         "themes": [
  //           "metal"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5df6d50a266b6a2cf4384b5f",
  //         "category": {
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/mushroom-strawberry.jpg",
  //         "fileName": "mushroom-strawberry.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": "Mushroom (strawberry)",
  //         "artworkDescription": "Roll-pressed steel sheet, spray paint. Low relief.",
  //         "naturalSize": {
  //           "naturalWidth": 779,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/mushroom-strawberry-desktop.jpg",
  //         "mobilePath": "uploads/mobile/mushroom-strawberry-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/mushroom-strawberry-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "shy-photos-3.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "photo"
  //           ],
  //           "listitems": [
  //             "color"
  //           ],
  //           "themes": [
  //             "social"
  //           ],
  //           "year": "2015",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Shy photographs",
  //         "displayMain": true,
  //         "themes": [
  //           "social"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2015",
  //         "_id": "5e0e51d9208f711970b73972",
  //         "category": {
  //           "medium": {
  //             "photo": [
  //               "color"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/shy-photos-3.jpg",
  //         "fileName": "shy-photos-3.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "I intended to take pictures of people in crowds, but felt self-conscious pointing my camera at faces so images are out of focus and shaky. Taken on a double decker bus around Oxford Circus in London, UK.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1080,
  //           "naturalHeight": 810
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/shy-photos-3-desktop.jpg",
  //         "mobilePath": "uploads/mobile/shy-photos-3-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/shy-photos-3-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "siaudu_batai_1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "social",
  //             "tools"
  //           ],
  //           "year": "2013",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Šiaudų batai",
  //         "displayMain": true,
  //         "themes": [
  //           "social",
  //           "tools"
  //         ],
  //         "seeAlso": [
  //           "malonioji_3.jpg"
  //         ],
  //         "location": "London, UK",
  //         "year": "2013",
  //         "_id": "5dfa6af3de6a352340297e29",
  //         "category": {
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/siaudu_batai_1.jpg",
  //         "fileName": "siaudu_batai_1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Straw, epoxy resin, stick, audio player, 2 soundtracks by Martynas Svilys and Rowan Wigley. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1440,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/siaudu_batai_1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/siaudu_batai_1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/siaudu_batai_1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "staircase-2-0.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "public"
  //           ],
  //           "subcategory": [
  //             "other"
  //           ],
  //           "listitems": [
  //             "print material"
  //           ],
  //           "themes": [
  //             "social",
  //             "staircase"
  //           ],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Staircase",
  //         "displayMain": true,
  //         "themes": [
  //           "social",
  //           "staircase"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5e0883be12172c2514bdb68e",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ]
  //           },
  //           "public": {
  //             "other": []
  //           }
  //         },
  //         "filePath": "uploads/staircase-2-0.jpg",
  //         "fileName": "staircase-2-0.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A show of posters in a social estate in London, UK. Poster images by Stacey Broadbent, Alex Gengos, Jonas Lozoraitis, James Stradner, Martynas Svilys, Rowan Wigley,  and me. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 810,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/staircase-2-0-desktop.jpg",
  //         "mobilePath": "uploads/mobile/staircase-2-0-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/staircase-2-0-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "staircase-after-3.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "public"
  //           ],
  //           "subcategory": [
  //             "other"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "staircase",
  //             "social"
  //           ],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Staircase-later",
  //         "displayMain": true,
  //         "themes": [
  //           "staircase",
  //           "social"
  //         ],
  //         "seeAlso": [
  //           "staircase-2-0.jpg"
  //         ],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5e08865212172c2514bdb694",
  //         "category": {
  //           "public": {
  //             "other": []
  //           }
  //         },
  //         "filePath": "uploads/staircase-after-3.jpg",
  //         "fileName": "staircase-after-3.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "I returned to the estate to look at the posters once again, found them stripped off walls leaving white sunfaded rectangles framed with dried dirty mop water.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 607,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/staircase-after-3-desktop.jpg",
  //         "mobilePath": "uploads/mobile/staircase-after-3-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/staircase-after-3-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "strawberry-forcefield.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "painting"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "fruit",
  //             "social"
  //           ],
  //           "year": "2018",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": true,
  //         "themes": [
  //           "fruit",
  //           "social"
  //         ],
  //         "seeAlso": [
  //           "apple-pig-close-up.jpg"
  //         ],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5df6d79d266b6a2cf4384b64",
  //         "category": {
  //           "medium": {
  //             "painting": []
  //           }
  //         },
  //         "filePath": "uploads/strawberry-forcefield.jpg",
  //         "fileName": "strawberry-forcefield.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": "Strawberry forcefield",
  //         "artworkDescription": "Water based paint (gouache or acrylics) and oil or soft pastel on paper.",
  //         "naturalSize": {
  //           "naturalWidth": 1543,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 11,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/strawberry-forcefield-desktop.jpg",
  //         "mobilePath": "uploads/mobile/strawberry-forcefield-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/strawberry-forcefield-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "trampled.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "graphics",
  //             "painting"
  //           ],
  //           "listitems": [
  //             "drawing"
  //           ],
  //           "themes": [
  //             "metal",
  //             "frame"
  //           ],
  //           "year": "2018",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": true,
  //         "themes": [
  //           "metal",
  //           "frame"
  //         ],
  //         "seeAlso": [
  //           "malonioji_3.jpg",
  //           "north_1.jpg"
  //         ],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5df2d17640edab1940975b3b",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "drawing"
  //             ],
  //             "painting": []
  //           }
  //         },
  //         "filePath": "uploads/trampled.jpg",
  //         "fileName": "trampled.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": "Trampled by maggot ",
  //         "artworkDescription": "On a tip tray",
  //         "naturalSize": {
  //           "naturalWidth": 1092,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/trampled-desktop.jpg",
  //         "mobilePath": "uploads/mobile/trampled-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/trampled-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "Untitled42.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "photo"
  //           ],
  //           "listitems": [
  //             "b/w"
  //           ],
  //           "themes": [
  //             "restaurant"
  //           ],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Lorenzo",
  //         "displayMain": true,
  //         "themes": [
  //           "social",
  //           "restaurant"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa7981de6a352340297e3f",
  //         "category": {
  //           "medium": {
  //             "photo": [
  //               "b/w"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/Untitled42.jpg",
  //         "fileName": "Untitled42.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "I ask my two friends and coworkers, both named Lorenzo, to act as models in a couple of scenes. Photographed by Rowan Wigley.",
  //         "artworkTitle": "Hospitality",
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1650,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/Untitled42-desktop.jpg",
  //         "mobilePath": "uploads/mobile/Untitled42-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/Untitled42-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "WP_20150806_004.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Restaurant",
  //         "displayMain": true,
  //         "themes": [
  //           "restaurant",
  //           "tools"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa7f26061ab618f4ee6bef",
  //         "category": {
  //           "studio": {
  //             "misc": []
  //           }
  //         },
  //         "filePath": "uploads/WP_20150806_004.jpg",
  //         "fileName": "WP_20150806_004.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Service trays arranged on restaurant furniture. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 607,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/WP_20150806_004-desktop.jpg",
  //         "mobilePath": "uploads/mobile/WP_20150806_004-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/WP_20150806_004-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "WP_20150806_007.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [
  //             "misc"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "restaurant",
  //             "tools"
  //           ],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Restaurant",
  //         "displayMain": true,
  //         "themes": [
  //           "restaurant",
  //           "tools"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa7f26061ab618f4ee6bee",
  //         "category": {
  //           "studio": {
  //             "misc": []
  //           }
  //         },
  //         "filePath": "uploads/WP_20150806_007.jpg",
  //         "fileName": "WP_20150806_007.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Service trays arranged on restaurant furniture. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 607,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/WP_20150806_007-desktop.jpg",
  //         "mobilePath": "uploads/mobile/WP_20150806_007-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/WP_20150806_007-thumbnail.jpg",
  //         "useFamilySetup": false
  //       }
  //     },
  //     "visibleArtwork": {
  //       "20191106_075914.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "misc"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "oil pastel",
  //             "furniture"
  //           ],
  //           "year": "2019",
  //           "location": "Warsaw, Poland"
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": true,
  //         "themes": [
  //           "oil pastel",
  //           "furniture"
  //         ],
  //         "seeAlso": [],
  //         "location": "Warsaw, Poland",
  //         "year": "2019",
  //         "_id": "5e0a12b89ed2212d5071768e",
  //         "category": {
  //           "studio": {
  //             "misc": []
  //           }
  //         },
  //         "filePath": "uploads/20191106_075914.jpg",
  //         "fileName": "20191106_075914.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": "Bed",
  //         "artworkDescription": "Oil pastel in notebook.",
  //         "naturalSize": {
  //           "naturalWidth": 2536,
  //           "naturalHeight": 1960
  //         },
  //         "familyDisplayIndex": 15,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/20191106_075914-desktop.jpg",
  //         "mobilePath": "uploads/mobile/20191106_075914-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/20191106_075914-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "before-eyes.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [
  //             "painting"
  //           ],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "2017",
  //           "location": "Woolwich, London, UK"
  //         },
  //         "artworkFamily": "Before eyes",
  //         "displayMain": true,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Woolwich, London, UK",
  //         "year": "2017",
  //         "_id": "5df6d2b0266b6a2cf4384b5c",
  //         "category": {
  //           "medium": {
  //             "painting": []
  //           },
  //           "studio": {
  //             "wip": []
  //           }
  //         },
  //         "filePath": "uploads/before-eyes.jpg",
  //         "fileName": "before-eyes.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": "",
  //         "artworkDescription": "Stitched dust protection sheet stretched on custom frame, various paints, ballpoint pen, soft pastel. ",
  //         "naturalSize": {
  //           "naturalWidth": 608,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/before-eyes-desktop.jpg",
  //         "mobilePath": "uploads/mobile/before-eyes-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/before-eyes-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "bench-public-2.png": {
  //         "displayTriggers": {
  //           "category": [
  //             "public",
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture",
  //             "other"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "furniture",
  //             "social"
  //           ],
  //           "year": "2018",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Bench",
  //         "displayMain": true,
  //         "themes": [
  //           "furniture",
  //           "social"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5df6cef8266b6a2cf4384b55",
  //         "category": {
  //           "public": {
  //             "other": []
  //           },
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/bench-public-2.png",
  //         "fileName": "bench-public-2.png",
  //         "fileType": "image/png",
  //         "familyDescription": "In 2018 I attended a professional training programme. The atmosphere felt oppressive. I made this bench, brought it over to school and chained it around a column. It has two modes: bench and ashtray (made from groin protector). The building security (male) approached me as soon as I entered the building and asked if I had permission chain down the bench. I, aggro-defensively, lied that I had. Later I had to speak to the director of the school (female), to whom I presented the bench as a public benefit and so the bench stayed. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 990,
  //           "naturalHeight": 562
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/bench-public-2-desktop.png",
  //         "mobilePath": "uploads/mobile/bench-public-2-mob.png",
  //         "thumbnailPath": "uploads/thumbnails/bench-public-2-thumbnail.png",
  //         "useFamilySetup": false
  //       },
  //       "blue-frame-1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [
  //             "ceramics"
  //           ],
  //           "themes": [
  //             "frame"
  //           ],
  //           "year": "2019",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Blue frame",
  //         "displayMain": true,
  //         "themes": [
  //           "frame"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2019",
  //         "_id": "5e0a0e149ed2212d50717687",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "ceramics"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/blue-frame-1.jpg",
  //         "fileName": "blue-frame-1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Unfired clay frame covered with paraffin wax and spray painted blue. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1196,
  //           "naturalHeight": 720
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/blue-frame-1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/blue-frame-1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/blue-frame-1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "ceramic-stand-2.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "wip"
  //           ],
  //           "listitems": [
  //             "progress"
  //           ],
  //           "themes": [
  //             "vessel"
  //           ],
  //           "year": "2019",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Clay stand",
  //         "displayMain": true,
  //         "themes": [
  //           "vessel"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2019",
  //         "_id": "5e0a0fef9ed2212d5071768b",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "ceramics"
  //             ]
  //           },
  //           "studio": {
  //             "wip": [
  //               "progress"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/ceramic-stand-2.jpg",
  //         "fileName": "ceramic-stand-2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Initial design involved three recesses: \nfor flax seeds, for a wax apple and for up to two low denomination coins. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1960,
  //           "naturalHeight": 2989
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/ceramic-stand-2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/ceramic-stand-2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/ceramic-stand-2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "ceramic-stand-3.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [
  //             "ceramics"
  //           ],
  //           "themes": [
  //             "vessel"
  //           ],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Clay stand",
  //         "displayMain": true,
  //         "themes": [
  //           "vessel"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2019",
  //         "_id": "5e0a0fef9ed2212d5071768a",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "ceramics"
  //             ]
  //           },
  //           "studio": {
  //             "wip": []
  //           }
  //         },
  //         "filePath": "uploads/ceramic-stand-3.jpg",
  //         "fileName": "ceramic-stand-3.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Initial design involved three recesses: \nfor flax seeds, for a wax apple and for up to two low denomination coins. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 525,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/ceramic-stand-3-desktop.jpg",
  //         "mobilePath": "uploads/mobile/ceramic-stand-3-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/ceramic-stand-3-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "cherry1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "graphics"
  //           ],
  //           "listitems": [
  //             "cg"
  //           ],
  //           "themes": [
  //             "fruit"
  //           ],
  //           "year": "2018",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Cherry",
  //         "displayMain": true,
  //         "themes": [
  //           "fruit"
  //         ],
  //         "seeAlso": [
  //           "201911281605236_BGFC2LL5.jpg",
  //           "20170723_120614.jpg",
  //           "20170817_172102.jpg",
  //           "2019_superbig_00_see_the_bigger_picture_PC.jpg",
  //           "galaxy-watch-active2-hr-monitoring-sensor-effect.png",
  //           "im0035_explore_article-thumbnail_pc_1440x1060.jpg"
  //         ],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5df6cc83266b6a2cf4384b4f",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "cg",
  //               "print material"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/cherry1.jpg",
  //         "fileName": "cherry1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A Christmas present I made for my brother Darius and his girlfriend Sandra",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 2480,
  //           "naturalHeight": 3508
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/cherry1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/cherry1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/cherry1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "chicken_leg_2.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "metal",
  //             "support"
  //           ],
  //           "year": "2013",
  //           "location": ""
  //         },
  //         "artworkFamily": "Chicken leg",
  //         "displayMain": true,
  //         "themes": [
  //           "metal",
  //           "support"
  //         ],
  //         "seeAlso": [
  //           "foot-with-handle-1.jpg"
  //         ],
  //         "location": "",
  //         "year": "2013",
  //         "_id": "5dfa67aede6a352340297e19",
  //         "category": {
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/chicken_leg_2.jpg",
  //         "fileName": "chicken_leg_2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1618,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/chicken_leg_2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/chicken_leg_2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/chicken_leg_2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "connectedSpheres2.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium",
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "graphics",
  //             "wip"
  //           ],
  //           "listitems": [
  //             "drawing",
  //             "sketches"
  //           ],
  //           "themes": [
  //             "connected spheres"
  //           ],
  //           "year": "2017",
  //           "location": "Woolwich, London, UK"
  //         },
  //         "artworkFamily": "Connected spheres",
  //         "displayMain": true,
  //         "themes": [
  //           "connected spheres"
  //         ],
  //         "seeAlso": [
  //           "stage_kieme_1.jpg",
  //           "malonioji_1.jpg",
  //           "kiss-0.jpg"
  //         ],
  //         "location": "Woolwich, London, UK",
  //         "year": "2017",
  //         "_id": "5df6c8e3266b6a2cf4384b46",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "drawing"
  //             ]
  //           },
  //           "studio": {
  //             "wip": [
  //               "sketches"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/connectedSpheres2.jpg",
  //         "fileName": "connectedSpheres2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1424,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/connectedSpheres2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/connectedSpheres2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/connectedSpheres2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "days2.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "days",
  //             "metal"
  //           ],
  //           "year": "2015",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Days",
  //         "displayMain": true,
  //         "themes": [
  //           "days",
  //           "metal"
  //         ],
  //         "seeAlso": [
  //           "WP_20150806_004.jpg",
  //           "WP_20150806_007.jpg"
  //         ],
  //         "location": "London, UK",
  //         "year": "2015",
  //         "_id": "5df6cfe7266b6a2cf4384b58",
  //         "category": {
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/days2.jpg",
  //         "fileName": "days2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 607,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/days2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/days2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/days2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "foot-with-handle-2.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [
  //             "ceramics",
  //             "plaster"
  //           ],
  //           "themes": [
  //             "tools"
  //           ],
  //           "year": "2018",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Foot with a handle",
  //         "displayMain": true,
  //         "themes": [
  //           "tools"
  //         ],
  //         "seeAlso": [
  //           "chicken_leg_2.jpg",
  //           "kolona.jpg"
  //         ],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5e0a137d9ed2212d50717693",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "ceramics",
  //               "plaster"
  //             ]
  //           },
  //           "studio": {
  //             "wip": []
  //           }
  //         },
  //         "filePath": "uploads/foot-with-handle-2.jpg",
  //         "fileName": "foot-with-handle-2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A clay or plaster (cast) foot propped on various furniture handles. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1459,
  //           "naturalHeight": 2593
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/foot-with-handle-2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/foot-with-handle-2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/foot-with-handle-2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "ghost_2.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [
  //             "plaster"
  //           ],
  //           "themes": [
  //             "metal"
  //           ],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Ghost",
  //         "displayMain": true,
  //         "themes": [
  //           "metal"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa69b1de6a352340297e26",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "plaster"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/ghost_2.jpg",
  //         "fileName": "ghost_2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 720,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/ghost_2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/ghost_2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/ghost_2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "gradient0.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "graphics"
  //           ],
  //           "listitems": [
  //             "drawing"
  //           ],
  //           "themes": [
  //             "acephale"
  //           ],
  //           "year": "2016",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "acephale_gradient",
  //         "displayMain": true,
  //         "themes": [
  //           "acephale"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2016",
  //         "_id": "5df2cdf840edab1940975b38",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "drawing"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/gradient0.jpg",
  //         "fileName": "gradient0.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 764,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/gradient0-desktop.jpg",
  //         "mobilePath": "uploads/mobile/gradient0-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/gradient0-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "hammerScrew.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium",
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "graphics",
  //             "wip"
  //           ],
  //           "listitems": [
  //             "drawing",
  //             "sketches"
  //           ],
  //           "themes": [
  //             "acephale",
  //             "tools"
  //           ],
  //           "year": "2018",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Hammer screw",
  //         "displayMain": true,
  //         "themes": [
  //           "acephale",
  //           "tools"
  //         ],
  //         "seeAlso": [
  //           "gradient0.jpg"
  //         ],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5df2d0b040edab1940975b3a",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "drawing"
  //             ]
  //           },
  //           "studio": {
  //             "wip": [
  //               "sketches"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/hammerScrew.jpg",
  //         "fileName": "hammerScrew.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": null,
  //         "artworkDescription": "Hammer screw",
  //         "naturalSize": {
  //           "naturalWidth": 767,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/hammerScrew-desktop.jpg",
  //         "mobilePath": "uploads/mobile/hammerScrew-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/hammerScrew-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "james_print_1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "graphics",
  //             "photo"
  //           ],
  //           "listitems": [
  //             "print material",
  //             "color"
  //           ],
  //           "themes": [
  //             "social",
  //             "fruit"
  //           ],
  //           "year": "2013",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "James' print",
  //         "displayMain": true,
  //         "themes": [
  //           "social",
  //           "fruit"
  //         ],
  //         "seeAlso": [
  //           "james-1.jpg",
  //           "james-2.jpg"
  //         ],
  //         "location": "London, UK",
  //         "year": "2013",
  //         "_id": "5dfa76b9de6a352340297e38",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ],
  //             "photo": [
  //               "color"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/james_print_1.jpg",
  //         "fileName": "james_print_1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "I attended a dinner party and brought a bouquet of cabbage leaves and a banana. I asked the host to photograph it, print it and leave the photograph in my studio as we were course mates. He complied, but on reverse left a note. I asked to cross that out and return once that is done. ",
  //         "artworkTitle": null,
  //         "artworkDescription": "An enlarged print of this image featured in a self-organized display of posters in a staircase of a social estate in London, UK.",
  //         "naturalSize": {
  //           "naturalWidth": 716,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/james_print_1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/james_print_1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/james_print_1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "jozin-2.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "photo"
  //           ],
  //           "listitems": [
  //             "color"
  //           ],
  //           "themes": [],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Jozin print",
  //         "displayMain": true,
  //         "themes": [
  //           "acephale"
  //         ],
  //         "seeAlso": [
  //           "Untitled32.jpg"
  //         ],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5e0a64987d57c70eb872ee97",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ],
  //             "photo": [
  //               "color"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/jozin-2.jpg",
  //         "fileName": "jozin-2.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A print on commercial banner, held to a wall with an excess of fixtures.",
  //         "artworkTitle": null,
  //         "artworkDescription": "A portrait of me crawling out of a pond in a park in London, smiling as if cheering on the scenario on the right.",
  //         "naturalSize": {
  //           "naturalWidth": 1688,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/jozin-2-desktop.jpg",
  //         "mobilePath": "uploads/mobile/jozin-2-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/jozin-2-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "jozin-3.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "graphics"
  //           ],
  //           "listitems": [
  //             "print material"
  //           ],
  //           "themes": [
  //             "acephale"
  //           ],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Jozin print",
  //         "displayMain": true,
  //         "themes": [
  //           "acephale"
  //         ],
  //         "seeAlso": [
  //           "woodblock-3.jpg"
  //         ],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5e0a64987d57c70eb872ee98",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/jozin-3.jpg",
  //         "fileName": "jozin-3.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A print on commercial banner, held to a wall with an excess of fixtures.",
  //         "artworkTitle": null,
  //         "artworkDescription": "Two headless figures spinning in a circle, or greeting, or wrestling surrounded in fog. Scanned woodblock print.",
  //         "naturalSize": {
  //           "naturalWidth": 1553,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/jozin-3-desktop.jpg",
  //         "mobilePath": "uploads/mobile/jozin-3-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/jozin-3-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "kiss-0.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [
  //             "other",
  //             "plaster"
  //           ],
  //           "themes": [
  //             "connected spheres",
  //             "kiss"
  //           ],
  //           "year": "2017",
  //           "location": "Woolwich, London, UK"
  //         },
  //         "artworkFamily": "Kissing",
  //         "displayMain": true,
  //         "themes": [
  //           "connected spheres",
  //           "kiss"
  //         ],
  //         "seeAlso": [
  //           "connectedSpheres2.jpg",
  //           "kiss4.jpg"
  //         ],
  //         "location": "Woolwich, London, UK",
  //         "year": "2017",
  //         "_id": "5e0a67d07d57c70eb872ee9c",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "other",
  //               "plaster"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/kiss-0.jpg",
  //         "fileName": "kiss-0.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Plaster, sand, baby oil. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 737,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/kiss-0-desktop.jpg",
  //         "mobilePath": "uploads/mobile/kiss-0-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/kiss-0-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "kiss4.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "graphics"
  //           ],
  //           "listitems": [
  //             "drawing",
  //             "sketches"
  //           ],
  //           "themes": [
  //             "connected spheres"
  //           ],
  //           "year": "2017",
  //           "location": "Woolwich, London, UK"
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": true,
  //         "themes": [
  //           "connected spheres"
  //         ],
  //         "seeAlso": [
  //           "malonioji_1.jpg",
  //           "kiss-3.jpg",
  //           "kiss-0.jpg"
  //         ],
  //         "location": "Woolwich, London, UK",
  //         "year": "2017",
  //         "_id": "5df2d1a440edab1940975b3c",
  //         "category": {
  //           "studio": {
  //             "wip": [
  //               "sketches"
  //             ]
  //           },
  //           "medium": {
  //             "graphics": [
  //               "drawing"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/kiss4.jpg",
  //         "fileName": "kiss4.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": "Kiss",
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 377,
  //           "naturalHeight": 566
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/kiss4-desktop.jpg",
  //         "mobilePath": "uploads/mobile/kiss4-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/kiss4-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "kolona.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium",
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "sculpture",
  //             "wip"
  //           ],
  //           "listitems": [
  //             "ceramics",
  //             "progress"
  //           ],
  //           "themes": [
  //             "connected spheres",
  //             "support"
  //           ],
  //           "year": "2019",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Kolona",
  //         "displayMain": true,
  //         "themes": [
  //           "connected spheres",
  //           "support"
  //         ],
  //         "seeAlso": [
  //           "foot-with-handle-1.jpg"
  //         ],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2019",
  //         "_id": "5dfa6e64de6a352340297e35",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "ceramics"
  //             ]
  //           },
  //           "studio": {
  //             "wip": [
  //               "progress"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/kolona.jpg",
  //         "fileName": "kolona.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 608,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/kolona-desktop.jpg",
  //         "mobilePath": "uploads/mobile/kolona-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/kolona-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "malonioji_1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium",
  //             "public"
  //           ],
  //           "subcategory": [
  //             "sculpture",
  //             "exhibitions"
  //           ],
  //           "listitems": [
  //             "installation",
  //             "malonioji"
  //           ],
  //           "themes": [],
  //           "year": "2015",
  //           "location": "Vilnius, Lithuania"
  //         },
  //         "artworkFamily": "Poilsis",
  //         "displayMain": true,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Vilnius, Lithuania",
  //         "year": "2015",
  //         "_id": "5dfe01f7e7c9572b24e752a9",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "installation"
  //             ]
  //           },
  //           "public": {
  //             "exhibitions": [
  //               "malonioji"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/malonioji_1.jpg",
  //         "fileName": "malonioji_1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Exhibition and bts shots from an exhibition called Daiktai Sandėlyje.",
  //         "artworkTitle": "Stack",
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 721,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/malonioji_1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/malonioji_1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/malonioji_1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "malonioji_3.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium",
  //             "public"
  //           ],
  //           "subcategory": [
  //             "sculpture",
  //             "exhibitions"
  //           ],
  //           "listitems": [
  //             "installation",
  //             "malonioji"
  //           ],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Poilsis",
  //         "displayMain": true,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Vilnius, Lithuania",
  //         "year": "2015",
  //         "_id": "5dfe01f7e7c9572b24e752a8",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "installation"
  //             ]
  //           },
  //           "public": {
  //             "exhibitions": [
  //               "malonioji"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/malonioji_3.jpg",
  //         "fileName": "malonioji_3.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Exhibition and bts shots from an exhibition called Daiktai Sandėlyje.",
  //         "artworkTitle": "Gitaxian Probe",
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 771,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/malonioji_3-desktop.jpg",
  //         "mobilePath": "uploads/mobile/malonioji_3-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/malonioji_3-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "malonioji_4.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium",
  //             "public"
  //           ],
  //           "subcategory": [
  //             "sculpture",
  //             "exhibitions"
  //           ],
  //           "listitems": [
  //             "installation",
  //             "malonioji"
  //           ],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Poilsis",
  //         "displayMain": true,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Vilnius, Lithuania",
  //         "year": "2015",
  //         "_id": "5dfe01f7e7c9572b24e752ab",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "installation"
  //             ]
  //           },
  //           "public": {
  //             "exhibitions": [
  //               "malonioji"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/malonioji_4.jpg",
  //         "fileName": "malonioji_4.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Exhibition and bts shots from an exhibition called Daiktai Sandėlyje.",
  //         "artworkTitle": "Shelf",
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 721,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 3,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/malonioji_4-desktop.jpg",
  //         "mobilePath": "uploads/mobile/malonioji_4-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/malonioji_4-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "mirror-shelf-1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [
  //             "other"
  //           ],
  //           "themes": [
  //             "furniture"
  //           ],
  //           "year": "2019",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Mirror shelf",
  //         "displayMain": true,
  //         "themes": [
  //           "furniture"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2019",
  //         "_id": "5e0a16369ed2212d50717695",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "other"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/mirror-shelf-1.jpg",
  //         "fileName": "mirror-shelf-1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A two part contraption devised to hold a mirror on a corner of a wall. Covered in synthetic purple satin and blue felt.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 555,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/mirror-shelf-1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/mirror-shelf-1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/mirror-shelf-1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "mushroom-strawberry.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "metal"
  //           ],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Mushroom",
  //         "displayMain": true,
  //         "themes": [
  //           "metal"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5df6d50a266b6a2cf4384b5f",
  //         "category": {
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/mushroom-strawberry.jpg",
  //         "fileName": "mushroom-strawberry.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": "Mushroom (strawberry)",
  //         "artworkDescription": "Roll-pressed steel sheet, spray paint. Low relief.",
  //         "naturalSize": {
  //           "naturalWidth": 779,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/mushroom-strawberry-desktop.jpg",
  //         "mobilePath": "uploads/mobile/mushroom-strawberry-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/mushroom-strawberry-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "north_1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [
  //             "frame"
  //           ],
  //           "year": "",
  //           "location": "",
  //           "artworkDescription": []
  //         },
  //         "artworkFamily": "North aligned frame",
  //         "displayMain": true,
  //         "themes": [
  //           "frame"
  //         ],
  //         "seeAlso": [],
  //         "location": "Coldbath street, London, UK",
  //         "year": "2015",
  //         "_id": "5e02885319a99537e42a859e",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "plaster"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/north_1.jpg",
  //         "fileName": "north_1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1440,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/north_1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/north_1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/north_1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "red-frame.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium",
  //             "studio"
  //           ],
  //           "subcategory": [
  //             "painting",
  //             "wip"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "frame"
  //           ],
  //           "year": "2017",
  //           "location": "Woolwich, London, UK"
  //         },
  //         "artworkFamily": "Red frame",
  //         "displayMain": true,
  //         "themes": [
  //           "frame"
  //         ],
  //         "seeAlso": [
  //           "velniai_2.jpg",
  //           "north_1.jpg"
  //         ],
  //         "location": "Woolwich, London, UK",
  //         "year": "2017",
  //         "_id": "5df6d605266b6a2cf4384b62",
  //         "category": {
  //           "medium": {
  //             "painting": []
  //           },
  //           "studio": {
  //             "wip": []
  //           }
  //         },
  //         "filePath": "uploads/red-frame.jpg",
  //         "fileName": "red-frame.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": "",
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 608,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/red-frame-desktop.jpg",
  //         "mobilePath": "uploads/mobile/red-frame-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/red-frame-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "shitty-day.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "painting"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "weather",
  //             "cloud",
  //             "days",
  //             "celestial body"
  //           ],
  //           "year": "2015",
  //           "location": "Coldbath street, London, UK"
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": true,
  //         "themes": [
  //           "weather",
  //           "cloud",
  //           "days",
  //           "celestial body"
  //         ],
  //         "seeAlso": [
  //           "241.jpg",
  //           "emo-sky.jpg"
  //         ],
  //         "location": "Coldbath street, London, UK",
  //         "year": "2015",
  //         "_id": "5df6d705266b6a2cf4384b63",
  //         "category": {
  //           "medium": {
  //             "painting": []
  //           }
  //         },
  //         "filePath": "uploads/shitty-day.jpg",
  //         "fileName": "shitty-day.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": "Šūdina diena",
  //         "artworkDescription": "Brown clouds in brown sky, floating away or hanging heavily in place. When the paint was still wet, I layed some sort of street sign on this board so I could have two of the same painting. ",
  //         "naturalSize": {
  //           "naturalWidth": 1072,
  //           "naturalHeight": 882
  //         },
  //         "familyDisplayIndex": 10,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/shitty-day-desktop.jpg",
  //         "mobilePath": "uploads/mobile/shitty-day-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/shitty-day-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "shy-photos-3.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "photo"
  //           ],
  //           "listitems": [
  //             "color"
  //           ],
  //           "themes": [
  //             "social"
  //           ],
  //           "year": "2015",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Shy photographs",
  //         "displayMain": true,
  //         "themes": [
  //           "social"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2015",
  //         "_id": "5e0e51d9208f711970b73972",
  //         "category": {
  //           "medium": {
  //             "photo": [
  //               "color"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/shy-photos-3.jpg",
  //         "fileName": "shy-photos-3.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "I intended to take pictures of people in crowds, but felt self-conscious pointing my camera at faces so images are out of focus and shaky. Taken on a double decker bus around Oxford Circus in London, UK.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1080,
  //           "naturalHeight": 810
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/shy-photos-3-desktop.jpg",
  //         "mobilePath": "uploads/mobile/shy-photos-3-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/shy-photos-3-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "siaudu_batai_1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "social",
  //             "tools"
  //           ],
  //           "year": "2013",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Šiaudų batai",
  //         "displayMain": true,
  //         "themes": [
  //           "social",
  //           "tools"
  //         ],
  //         "seeAlso": [
  //           "malonioji_3.jpg"
  //         ],
  //         "location": "London, UK",
  //         "year": "2013",
  //         "_id": "5dfa6af3de6a352340297e29",
  //         "category": {
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/siaudu_batai_1.jpg",
  //         "fileName": "siaudu_batai_1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Straw, epoxy resin, stick, audio player, 2 soundtracks by Martynas Svilys and Rowan Wigley. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1440,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/siaudu_batai_1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/siaudu_batai_1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/siaudu_batai_1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "staircase-2-0.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "public"
  //           ],
  //           "subcategory": [
  //             "other"
  //           ],
  //           "listitems": [
  //             "print material"
  //           ],
  //           "themes": [
  //             "social",
  //             "staircase"
  //           ],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Staircase",
  //         "displayMain": true,
  //         "themes": [
  //           "social",
  //           "staircase"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5e0883be12172c2514bdb68e",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ]
  //           },
  //           "public": {
  //             "other": []
  //           }
  //         },
  //         "filePath": "uploads/staircase-2-0.jpg",
  //         "fileName": "staircase-2-0.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A show of posters in a social estate in London, UK. Poster images by Stacey Broadbent, Alex Gengos, Jonas Lozoraitis, James Stradner, Martynas Svilys, Rowan Wigley,  and me. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 810,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 2,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/staircase-2-0-desktop.jpg",
  //         "mobilePath": "uploads/mobile/staircase-2-0-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/staircase-2-0-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "staircase-after-3.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "public"
  //           ],
  //           "subcategory": [
  //             "other"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "staircase",
  //             "social"
  //           ],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Staircase-later",
  //         "displayMain": true,
  //         "themes": [
  //           "staircase",
  //           "social"
  //         ],
  //         "seeAlso": [
  //           "staircase-2-0.jpg"
  //         ],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5e08865212172c2514bdb694",
  //         "category": {
  //           "public": {
  //             "other": []
  //           }
  //         },
  //         "filePath": "uploads/staircase-after-3.jpg",
  //         "fileName": "staircase-after-3.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "I returned to the estate to look at the posters once again, found them stripped off walls leaving white sunfaded rectangles framed with dried dirty mop water.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 607,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/staircase-after-3-desktop.jpg",
  //         "mobilePath": "uploads/mobile/staircase-after-3-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/staircase-after-3-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "star_4.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "metal"
  //           ],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Star",
  //         "displayMain": true,
  //         "themes": [
  //           "celestial body",
  //           "metal"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa6cebde6a352340297e31",
  //         "category": {
  //           "medium": {
  //             "sculpture": []
  //           }
  //         },
  //         "filePath": "uploads/star_4.jpg",
  //         "fileName": "star_4.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Plasma-cut steel sheet, lard, adhesive bandage.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 676,
  //           "naturalHeight": 964
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/star_4-desktop.jpg",
  //         "mobilePath": "uploads/mobile/star_4-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/star_4-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "strawberry-forcefield.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "painting"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "fruit",
  //             "social"
  //           ],
  //           "year": "2018",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": true,
  //         "themes": [
  //           "fruit",
  //           "social"
  //         ],
  //         "seeAlso": [
  //           "apple-pig-close-up.jpg"
  //         ],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5df6d79d266b6a2cf4384b64",
  //         "category": {
  //           "medium": {
  //             "painting": []
  //           }
  //         },
  //         "filePath": "uploads/strawberry-forcefield.jpg",
  //         "fileName": "strawberry-forcefield.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": "Strawberry forcefield",
  //         "artworkDescription": "Water based paint (gouache or acrylics) and oil or soft pastel on paper.",
  //         "naturalSize": {
  //           "naturalWidth": 1543,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 11,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/strawberry-forcefield-desktop.jpg",
  //         "mobilePath": "uploads/mobile/strawberry-forcefield-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/strawberry-forcefield-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "sundown.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "graphics"
  //           ],
  //           "listitems": [
  //             "cg"
  //           ],
  //           "themes": [
  //             "weather",
  //             "celestial body",
  //             "acephale",
  //             "days"
  //           ],
  //           "year": "2019",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "Sundown",
  //         "displayMain": true,
  //         "themes": [
  //           "weather",
  //           "celestial body",
  //           "acephale",
  //           "days"
  //         ],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2019",
  //         "_id": "5e0e6b85208f711970b73984",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "cg"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/sundown.jpg",
  //         "fileName": "sundown.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "A female figure facing the setting sun by sea. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 595,
  //           "naturalHeight": 338
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/sundown-desktop.jpg",
  //         "mobilePath": "uploads/mobile/sundown-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/sundown-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "trampled.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "graphics",
  //             "painting"
  //           ],
  //           "listitems": [
  //             "drawing"
  //           ],
  //           "themes": [
  //             "metal",
  //             "frame"
  //           ],
  //           "year": "2018",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "none",
  //         "displayMain": true,
  //         "themes": [
  //           "metal",
  //           "frame"
  //         ],
  //         "seeAlso": [
  //           "malonioji_3.jpg",
  //           "north_1.jpg"
  //         ],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2018",
  //         "_id": "5df2d17640edab1940975b3b",
  //         "category": {
  //           "medium": {
  //             "graphics": [
  //               "drawing"
  //             ],
  //             "painting": []
  //           }
  //         },
  //         "filePath": "uploads/trampled.jpg",
  //         "fileName": "trampled.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": null,
  //         "artworkTitle": "Trampled by maggot ",
  //         "artworkDescription": "On a tip tray",
  //         "naturalSize": {
  //           "naturalWidth": 1092,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/trampled-desktop.jpg",
  //         "mobilePath": "uploads/mobile/trampled-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/trampled-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "Untitled42.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "photo"
  //           ],
  //           "listitems": [
  //             "b/w"
  //           ],
  //           "themes": [
  //             "restaurant"
  //           ],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Lorenzo",
  //         "displayMain": true,
  //         "themes": [
  //           "social",
  //           "restaurant"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa7981de6a352340297e3f",
  //         "category": {
  //           "medium": {
  //             "photo": [
  //               "b/w"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/Untitled42.jpg",
  //         "fileName": "Untitled42.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "I ask my two friends and coworkers, both named Lorenzo, to act as models in a couple of scenes. Photographed by Rowan Wigley.",
  //         "artworkTitle": "Hospitality",
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1650,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/Untitled42-desktop.jpg",
  //         "mobilePath": "uploads/mobile/Untitled42-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/Untitled42-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "upe5.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium",
  //             "public"
  //           ],
  //           "subcategory": [
  //             "photo",
  //             "other"
  //           ],
  //           "listitems": [
  //             "b/w"
  //           ],
  //           "themes": [],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Beach service",
  //         "displayMain": true,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa7d0a061ab618f4ee6be6",
  //         "category": {
  //           "medium": {
  //             "photo": [
  //               "b/w"
  //             ]
  //           },
  //           "public": {
  //             "other": []
  //           }
  //         },
  //         "filePath": "uploads/upe5.jpg",
  //         "fileName": "upe5.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Clearing a rocky Thames beach at Surrey Quays, London.",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1620,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/upe5-desktop.jpg",
  //         "mobilePath": "uploads/mobile/upe5-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/upe5-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "woodblock-1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "medium"
  //           ],
  //           "subcategory": [
  //             "sculpture"
  //           ],
  //           "listitems": [
  //             "other"
  //           ],
  //           "themes": [],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Woodblock",
  //         "displayMain": true,
  //         "themes": [
  //           "acephale"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5e0a5f5b7d57c70eb872ee8e",
  //         "category": {
  //           "medium": {
  //             "sculpture": [
  //               "other"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/woodblock-1.jpg",
  //         "fileName": "woodblock-1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 720,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/woodblock-1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/woodblock-1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/woodblock-1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "WP_20150806_004.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "Restaurant",
  //         "displayMain": true,
  //         "themes": [
  //           "restaurant",
  //           "tools"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa7f26061ab618f4ee6bef",
  //         "category": {
  //           "studio": {
  //             "misc": []
  //           }
  //         },
  //         "filePath": "uploads/WP_20150806_004.jpg",
  //         "fileName": "WP_20150806_004.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Service trays arranged on restaurant furniture. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 607,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 1,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/WP_20150806_004-desktop.jpg",
  //         "mobilePath": "uploads/mobile/WP_20150806_004-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/WP_20150806_004-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "WP_20150806_007.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [
  //             "misc"
  //           ],
  //           "listitems": [],
  //           "themes": [
  //             "restaurant",
  //             "tools"
  //           ],
  //           "year": "2014",
  //           "location": "London, UK"
  //         },
  //         "artworkFamily": "Restaurant",
  //         "displayMain": true,
  //         "themes": [
  //           "restaurant",
  //           "tools"
  //         ],
  //         "seeAlso": [],
  //         "location": "London, UK",
  //         "year": "2014",
  //         "_id": "5dfa7f26061ab618f4ee6bee",
  //         "category": {
  //           "studio": {
  //             "misc": []
  //           }
  //         },
  //         "filePath": "uploads/WP_20150806_007.jpg",
  //         "fileName": "WP_20150806_007.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "Service trays arranged on restaurant furniture. ",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 607,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/WP_20150806_007-desktop.jpg",
  //         "mobilePath": "uploads/mobile/WP_20150806_007-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/WP_20150806_007-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "youdo1.jpg": {
  //         "displayTriggers": {
  //           "category": [
  //             "public"
  //           ],
  //           "subcategory": [
  //             "exhibitions"
  //           ],
  //           "listitems": [
  //             "gotta do",
  //             "print material"
  //           ],
  //           "themes": [],
  //           "year": "2016",
  //           "location": "Panevėžys, Lithuania"
  //         },
  //         "artworkFamily": "You gotta do what you gotta do",
  //         "displayMain": true,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2016",
  //         "_id": "5e0e6296208f711970b7397b",
  //         "category": {
  //           "public": {
  //             "exhibitions": [
  //               "gotta do"
  //             ]
  //           },
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/youdo1.jpg",
  //         "fileName": "youdo1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "An exhibition I put together with two of my friends (Jacob Bates-Firth and Sophia Freeman), taking personal materials we shared with each other over social networks and sticking them up on walls with tape or displaying them as videos on screens. \n\nhttps://daraikaturidaryti.tumblr.com/",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1440,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 0,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/youdo1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/youdo1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/youdo1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       },
  //       "youdo9-1.jpg": {
  //         "displayTriggers": {
  //           "category": [],
  //           "subcategory": [],
  //           "listitems": [],
  //           "themes": [],
  //           "year": "",
  //           "location": ""
  //         },
  //         "artworkFamily": "You gotta do what you gotta do",
  //         "displayMain": true,
  //         "themes": [],
  //         "seeAlso": [],
  //         "location": "Panevėžys, Lithuania",
  //         "year": "2016",
  //         "_id": "5e0e6297208f711970b7397f",
  //         "category": {
  //           "public": {
  //             "exhibitions": [
  //               "gotta do"
  //             ]
  //           },
  //           "medium": {
  //             "graphics": [
  //               "print material"
  //             ]
  //           }
  //         },
  //         "filePath": "uploads/youdo9-1.jpg",
  //         "fileName": "youdo9-1.jpg",
  //         "fileType": "image/jpeg",
  //         "familyDescription": "An exhibition I put together with two of my friends (Jacob Bates-Firth and Sophia Freeman), taking personal materials we shared with each other over social networks and sticking them up on walls with tape or displaying them as videos on screens. \n\nhttps://daraikaturidaryti.tumblr.com/",
  //         "artworkTitle": null,
  //         "artworkDescription": null,
  //         "naturalSize": {
  //           "naturalWidth": 1440,
  //           "naturalHeight": 1080
  //         },
  //         "familyDisplayIndex": 5,
  //         "__v": 0,
  //         "desktopPath": "uploads/desktop/youdo9-1-desktop.jpg",
  //         "mobilePath": "uploads/mobile/youdo9-1-mob.jpg",
  //         "thumbnailPath": "uploads/thumbnails/youdo9-1-thumbnail.jpg",
  //         "useFamilySetup": false
  //       }
  //     },
  //     "themesOnDisplay": {
  //       "eat": [
  //         "20170723_120614.jpg"
  //       ],
  //       "bones": [
  //         "20170723_120614.jpg",
  //         "241.jpg",
  //         "emo-sky.jpg"
  //       ],
  //       "weather": [
  //         "ash-and-chip.jpg",
  //         "emo-sky.jpg",
  //         "person-on-bridge.png",
  //         "shitty-day.jpg",
  //         "sundown.jpg"
  //       ],
  //       "celestial body": [
  //         "crescentBoxing.jpg",
  //         "shitty-day.jpg",
  //         "star_5.jpg",
  //         "sundown.jpg"
  //       ],
  //       "acephale": [
  //         "gradient0.jpg",
  //         "hammerScrew.jpg",
  //         "jozin-3.jpg",
  //         "sundown.jpg",
  //         "woodblock-3.jpg"
  //       ],
  //       "oil pastel": [
  //         "20191106_075914.jpg",
  //         "person-on-bridge.png"
  //       ],
  //       "furniture": [
  //         "20191106_075914.jpg",
  //         "ash-and-chip.jpg",
  //         "bench-public-2.png",
  //         "mirror-shelf-1.jpg",
  //         "tumblr_m1rb2rhvez1rsi2gco2_1280.jpg"
  //       ],
  //       "social": [
  //         "ash-and-chip.jpg",
  //         "bench-public-2.png",
  //         "james_print_1.jpg",
  //         "james_print_2.jpg",
  //         "shy-photos-2.jpg",
  //         "shy-photos-3.jpg",
  //         "siaudu_batai_1.jpg",
  //         "staircase-2-0.jpg",
  //         "staircase-after-2.jpg",
  //         "staircase-after-3.jpg",
  //         "strawberry-forcefield.jpg",
  //         "Untitled31.jpg",
  //         "Untitled54.jpg",
  //         "vignette-2.png",
  //         "vignette1.png",
  //         "wizard-and-his-scholar.jpg"
  //       ],
  //       "restaurant": [
  //         "crescentBoxing.jpg",
  //         "Untitled42.jpg",
  //         "WP_20150806_007.jpg"
  //       ],
  //       "staircase": [
  //         "staircase-2-0.jpg",
  //         "staircase-after-2.jpg",
  //         "staircase-after-3.jpg"
  //       ],
  //       "fruit": [
  //         "apple-pig-close-up.jpg",
  //         "cherry1.jpg",
  //         "detail_testciles_2.jpg",
  //         "DSC_7228.jpg",
  //         "james_print_1.jpg",
  //         "james_print_2.jpg",
  //         "strawberry-forcefield.jpg"
  //       ],
  //       "fountain": [],
  //       "frame": [
  //         "blue-frame-1.jpg",
  //         "north_1.jpg",
  //         "red-frame.jpg",
  //         "trampled.jpg"
  //       ],
  //       "vessel": [
  //         "ceramic-stand-2.jpg",
  //         "ceramic-stand-3.jpg"
  //       ],
  //       "metal": [
  //         "chicken_leg_2.jpg",
  //         "days2.jpg",
  //         "ghost_2.jpg",
  //         "jozin-5.jpg",
  //         "mushroom-strawberry.jpg",
  //         "star_4.jpg",
  //         "trampled.jpg",
  //         "WP_20180421_18_00_14_Pro.jpg",
  //         "WP_20180421_18_00_35_Pro.jpg"
  //       ],
  //       "support": [
  //         "chicken_leg_2.jpg",
  //         "jozin-5.jpg",
  //         "kolona.jpg"
  //       ],
  //       "connected spheres": [
  //         "connectedSpheres2.jpg",
  //         "kiss-0.jpg",
  //         "kiss-2.jpg",
  //         "kiss4.jpg",
  //         "kolona.jpg",
  //         "stage_kieme_1.jpg",
  //         "wizard-and-his-scholar.jpg"
  //       ],
  //       "crescent": [
  //         "crescentBoxing.jpg",
  //         "wizard-and-his-scholar.jpg"
  //       ],
  //       "days": [
  //         "days2.jpg",
  //         "shitty-day.jpg",
  //         "sundown.jpg"
  //       ],
  //       "cloud": [
  //         "emo-sky.jpg",
  //         "shitty-day.jpg"
  //       ],
  //       "tools": [
  //         "foot-with-handle-2.jpg",
  //         "ghost_3.jpg",
  //         "hammerScrew.jpg",
  //         "jozin-5.jpg",
  //         "siaudu_batai_1.jpg",
  //         "WP_20150806_007.jpg"
  //       ],
  //       "kiss": [
  //         "kiss-0.jpg"
  //       ],
  //       "cards": [
  //         "vignette1.png"
  //       ],
  //       "Time": [],
  //       "stage": [
  //         "stage_kieme_1.jpg"
  //       ]
  //     },
  //     mobile: document.documentElement.clientWidth < 721,
  // }
  this.state = {}

  this.enlarge = {}

    this.categoryChecked = (category) => {
        let onDisplay = false
        Object.keys(this.state.artworkOnDisplay).forEach(fileName => {
            const file = this.state.artworkOnDisplay[fileName]
            if(Object.keys(file.category).includes(category)){
                onDisplay = true
            }
        })
        // console.log(`${category} is checked: ${onDisplay}`)
        return onDisplay
    }

    this.filterByCategory = (category, hideAll) => {
      console.log("filter by category")
      console.log(category)
      return new Promise((res,rej) => {
        let newDisplay = {}
        let zeroDisplay = {}

        if(hideAll){
          console.log("hideAll true")
            Object.keys(this.state.visibleArtwork).forEach(fileName => {
              const file = this.state.visibleArtwork[fileName]
              if(file.category[category]){
                return newDisplay = {...newDisplay, [fileName]: file}
              }
              else{
                  zeroDisplay ={...zeroDisplay, [fileName]: file}
              }
          })
          return this.setState({artworkOnDisplay: newDisplay}, () => {res('filter by category complete')})
        }

        //ON UN-CHECK
        // if(!checkbox.checked){
          if(this.categoryChecked(category)){
          console.log("checkbox unchecked")
            Object.keys(this.state.artworkOnDisplay).forEach(fileName => {
                const file = this.state.artworkOnDisplay[fileName]
                if(!Object.keys(file.category).includes(category)){
                    newDisplay = {...newDisplay, [fileName]: file}
                }
                else{zeroDisplay = {...zeroDisplay, [fileName]: file}}
            })
            Object.keys(zeroDisplay).forEach(id => {
                document.getElementById(id).classList.add('image-hide')
            })
            setTimeout(() => {
              return this.setState({artworkOnDisplay: newDisplay}, () => {res(150)})
            }, 200);
        }
        //ON CHECK
        else{
          console.log("checkbox checked")
            newDisplay={...this.state.artworkOnDisplay}
            Object.keys(this.state.artworkInfoData).forEach(fileName => {
                const file = this.state.artworkInfoData[fileName]
                if(file.displayTriggers.category.includes(category)){
                  newDisplay = {...newDisplay, [fileName]: file}
                }
            })
            Object.keys(newDisplay).forEach(id => {
                document.getElementById(id).classList.remove('image-hide')
            })
            setTimeout(() => {
              return this.setState({artworkOnDisplay: newDisplay}, () => {res(150)})
            }, 200);
        }
      })
    }

    this.filterBySubcategory = (category, subcategory, hideAll) => {
      return new Promise ((res, rej) => {
          let newDisplay = {}
          let zeroDisplay = {}

          if(hideAll){
            Object.keys(this.state.visibleArtwork).forEach(fileName => {
              const file = this.state.visibleArtwork[fileName]
              if(file.category[category] && file.category[category][subcategory]){
                return newDisplay = {...newDisplay, [fileName]: file}
              }
              else{
                  zeroDisplay ={...zeroDisplay, [fileName]: file}
              }
          })
          return this.setState({artworkOnDisplay: newDisplay}, () => res('filtered by subcategory'))
          }

          //ON UN-CHECK
          if(this.subcategoryChecked(category, subcategory)){
              Object.keys(this.state.artworkOnDisplay).forEach(fileName => {
                  const file = this.state.artworkOnDisplay[fileName]
                  if(file.category[category]){
                      if(!Object.keys(file.category[category]).includes(subcategory)){
                          return newDisplay = {...newDisplay, [fileName]: file}
                      }
                      else{
                          zeroDisplay ={...zeroDisplay, [fileName]: file}
                      }
                  }
                  else{
                      return newDisplay = {...newDisplay, [fileName]: file}
                  }
              })

              Object.keys(zeroDisplay).forEach(id => {
                  document.getElementById(id).classList.add('image-hide')
              })
              setTimeout(() => {
                return this.setState({artworkOnDisplay: newDisplay})
              }, 200);
          }
          //ON CHECK
          else{
              newDisplay={...this.state.artworkOnDisplay}

              Object.keys(this.state.artworkInfoData).forEach(fileName => {
                  const file = this.state.artworkInfoData[fileName]
                  if(file.displayTriggers.subcategory.includes(subcategory)){
                    newDisplay = {...newDisplay, [fileName]: file}
                  }
              })
              Object.keys(newDisplay).forEach(id => {
                  document.getElementById(id).classList.remove('image-hide')
              })

              setTimeout(() => {
                return this.setState({artworkOnDisplay: newDisplay})
              }, 200);
          }
      })

    }
    this.subcategoryChecked = (category, subcategory) => {
        let onDisplay = false
        Object.keys(this.state.artworkOnDisplay).forEach(fileName => {
            const file = this.state.artworkOnDisplay[fileName]
            if(file.category[category]){
                if(Object.keys(file.category[category]).includes(subcategory)){
                    onDisplay = true
                }
            }
        })
        return onDisplay
    }
    this.listitemChecked = (category, subcategory, listitem) => {
        let onDisplay = false
        Object.keys(this.state.artworkOnDisplay).forEach(fileName => {
            const file = this.state.artworkOnDisplay[fileName]
            if(file.category[category]){
              if(file.category[category][subcategory]){
                if(file.category[category][subcategory].includes(listitem)){
                  return onDisplay = true
                }
              }
            }
        })
        return onDisplay
    }
    this.filterByListitem = (category, subcategory, listitem, hideAll) => {
      return new Promise ((res, rej) => {
        let newDisplay = {}
        let zeroDisplay = {}

        if(hideAll){
          Object.keys(this.state.visibleArtwork).forEach(fileName => {
            const file = this.state.visibleArtwork[fileName]
            if(file.category[category] && file.category[category][subcategory]){
              if(file.category[category][subcategory].includes(listitem)){
                return newDisplay = {...newDisplay, [fileName]: file}
              }
              else{
                zeroDisplay ={...zeroDisplay, [fileName]: file}
              }
            }
            else{
                zeroDisplay ={...zeroDisplay, [fileName]: file}
            }
        })
        return this.setState({artworkOnDisplay: newDisplay}, () => {res('fitlered by listitem')})
        }

        //ON UN-CHECK
        // if(!checkbox.checked){
          if(this.listitemChecked(category, subcategory, listitem)){
            Object.keys(this.state.artworkOnDisplay).forEach(fileName => {
                const file = this.state.artworkOnDisplay[fileName]
                if(file.category[category]){
                  if(file.category[category][subcategory]){
                    if(!file.category[category][subcategory].includes(listitem)){
                      newDisplay = {...newDisplay, [fileName]: file}
                    }
                    else{
                      zeroDisplay ={...zeroDisplay, [fileName]: file}
                    }
                  }
                  else{newDisplay = {...newDisplay, [fileName]: file}}
                }
                else{newDisplay = {...newDisplay, [fileName]: file}}
            })
            Object.keys(zeroDisplay).forEach(id => {
                document.getElementById(id).classList.add('image-hide')
            })
            setTimeout(() => {
              return this.setState({artworkOnDisplay: newDisplay})
            }, 200);
        }
        //ON CHECK
        else{
            newDisplay={...this.state.artworkOnDisplay}
            Object.keys(this.state.artworkInfoData).forEach(fileName => {
                const file = this.state.artworkInfoData[fileName]
                  if(file.displayTriggers.listitems.includes(listitem)){
                    newDisplay = {...newDisplay, [fileName]: file}
                  }
            })
            Object.keys(newDisplay).forEach(id => {
                document.getElementById(id).classList.remove('image-hide')
            })
            setTimeout(() => {
              return this.setState({artworkOnDisplay: newDisplay})
            }, 200);
        }
      })

    }
    /**
     * @param: e
     * @param: theme
     */
    this.filterByTheme = (theme, hideAll) => {

      return new Promise ((res, rej) => {

        const newState = {...this.state}
        const toggleArtwork = [...newState.themesOnDisplay[theme]]
        let artworkOnDisplay = {...newState.artworkOnDisplay}

        let visibleThemesList = []
        Object.keys(artworkOnDisplay).forEach(fileName => {
          visibleThemesList = artworkOnDisplay[fileName].themes.map(theme => theme)
        }, () => visibleThemesList = Array.from(new Set(visibleThemesList)))

        if(hideAll){
          console.log('on theme check')
          let all = this.state.artworkInfoData
          let allNames = Object.keys(this.state.artworkInfoData)
          let artworkOnDisplay = {}

          allNames.forEach(name => {
            if(all[name].displayTriggers.themes && all[name].displayTriggers.themes.includes(theme)){
              artworkOnDisplay = {...artworkOnDisplay, [name]: this.state.artworkInfoData[name]}
            }
          })

          return this.setState({artworkOnDisplay}, () => {
            allNames.forEach(name => {
              const DOMitem = document.getElementById(name)
              if(!DOMitem.src){
                DOMitem.src = DOMitem.getAttribute('data-src')
              }
              DOMitem.classList.remove("image-hide")
            })
            res('filter complete')
          })
        }
        //ON UN-CHECK
        // if(!checkbox.checked){
        if(this.themeChecked(theme)){
          console.log('on theme uncheck')
          toggleArtwork.forEach(item => {
            document.getElementById(item).classList.add("image-hide")
          })

          toggleArtwork.forEach(fileName => {
            delete artworkOnDisplay[fileName]
          })
          return this.setState({artworkOnDisplay}, () => res('filter by theme complete'))
        }

        else{
          console.log('on theme check')
          let all = this.state.artworkInfoData
          let allNames = Object.keys(this.state.artworkInfoData)

          allNames.forEach(name => {
            if(all[name].displayTriggers.themes && all[name].displayTriggers.themes.includes(theme)){
              artworkOnDisplay = {...artworkOnDisplay, [name]: this.state.artworkInfoData[name]}
            }
          })

          return this.setState({artworkOnDisplay}, () => {
            allNames.forEach(name => {
              const DOMitem = document.getElementById(name)
              if(!DOMitem.src){
                DOMitem.src = DOMitem.getAttribute('data-src')
              }
              DOMitem.classList.remove("image-hide")
              // setTimeout(() => {
              //   DOMitem.classList.remove("image-hide")
              // }, 200);
            })
            res('filter complete')
          })
        }
      })


    }

    this.filterAllThemes = (hide) => {
      let themes = []
      Object.keys(this.state.artworkOnDisplay).forEach(fileName => {
        const file = this.state.artworkOnDisplay[fileName]
        themes = [...themes, ...file.themes]
        })
      themes = Array.from(new Set(themes))

      if(hide){
        Object.keys(this.state.artworkOnDisplay).forEach(id => {
            document.getElementById(id).classList.add('image-hide')
        })
        setTimeout(() => {
          return this.setState({artworkOnDisplay: {}})
        }, 200);
      }
      else{
        // Object.keys(this.state.visibleArtwork).forEach(id => {
        //     document.getElementById(id).classList.remove('image-hide')
        // })
        Object.keys(this.state.artworkInfoData).forEach(id => {
            document.getElementById(id).classList.remove('image-hide')
            document.getElementById(id).classList.remove('FilePreview--imageContainer__empty')
            document.getElementById(id).src = document.getElementById(id).getAttribute("data-src")
        })
        return this.setState({artworkOnDisplay: {...this.state.visibleArtwork}})
      }
      // themes.forEach(theme => this.filterByTheme(theme, true))
    }

    this.filterByYear = (year) => {
            //ON UN-CHECK
            const newState = {...this.state}
            const toggleArtwork = [...newState.yearLocation.all.years[year]]
            let artworkOnDisplay = {...newState.artworkOnDisplay}

            // if(!checkbox.checked){
            if(this.yearChecked(year)){

              toggleArtwork.forEach(item => {
                document.getElementById(item).classList.add("image-hide")
              })

              setTimeout(() => {

                toggleArtwork.forEach(fileName => {
                  delete artworkOnDisplay[fileName]

                })
                return this.setState({artworkOnDisplay: artworkOnDisplay,
                  yearLocation:{...newState.yearLocation, visible: {
                    ...newState.yearLocation.visible, years: {
                      ...newState.yearLocation.visible.years, [year]: []
                    }
                  }}
                })

              }, 400);
            }
            else{
              const all = this.state.artworkInfoData
              const allNames = Object.keys(this.state.artworkInfoData)
              allNames.forEach(name => {
                const file = all[name]
                if(file.displayTriggers.year){
                  if(all[name].displayTriggers.year.includes(year)){
                    artworkOnDisplay = {...artworkOnDisplay, [name]: all[name]}
                    const DOMitem = document.getElementById(name)
                    DOMitem.classList.remove("image-hide")
                  }
                }
              })
              return this.setState({artworkOnDisplay})
            }

    }

    this.yearChecked = (year) => {

      let onDisplay = []
      const artworkOnDisplay = {...this.state.artworkOnDisplay}
      onDisplay = Object.keys(artworkOnDisplay).filter(fileName => {
        return artworkOnDisplay[fileName].year === year
      })
      return onDisplay.length > 0

  }

    this.themeChecked = (theme) => {
      let onDisplay = []
      const artworkOnDisplay = {...this.state.artworkOnDisplay}
      onDisplay = Object.keys(artworkOnDisplay).filter(fileName => {
        if(!artworkOnDisplay[fileName].displayTriggers.themes){
          return
        }
        return artworkOnDisplay[fileName].displayTriggers.themes.includes(theme) === true
      })
      return onDisplay.length > 0
    }

    this.filterByLocation = location => {
                  //ON UN-CHECK
                  const newState = {...this.state}
                  const toggleArtwork = [...newState.yearLocation.all.locations[location]]

                  let artworkOnDisplay = {...newState.artworkOnDisplay}

                  // if(!checkbox.checked){
                    if(this.locationChecked(location)){

                    toggleArtwork.forEach(item => {
                      document.getElementById(item).classList.add("image-hide")
                    })

                    setTimeout(() => {

                      toggleArtwork.forEach(fileName => {
                        delete artworkOnDisplay[fileName]

                      })
                      return this.setState({artworkOnDisplay: artworkOnDisplay,
                        yearLocation:{...newState.yearLocation, visible: {
                          ...newState.yearLocation.visible, locations: {
                            ...newState.yearLocation.visible.locations, [location]: []
                          }
                        }}
                      })

                    }, 400);
                  }
                  else{
                    const all = this.state.artworkInfoData
                    const allNames = Object.keys(this.state.artworkInfoData)
                    allNames.forEach(name => {
                      const file = all[name]
                      if(file.displayTriggers.location){
                        if(all[name].displayTriggers.location.includes(location)){
                          artworkOnDisplay = {...artworkOnDisplay, [name]: all[name]}
                          const DOMitem = document.getElementById(name)
                          DOMitem.classList.remove("image-hide")
                        }
                      }
                    })

                    // this.state.yearLocation.all.locations[location].forEach(item => {
                    // })

                    // this.state.yearLocation.all.locations[location].forEach(fileName => {
                    //   artworkOnDisplay = {...artworkOnDisplay, [fileName]: this.state.artworkInfoData[fileName]}
                    // })

                    return this.setState({artworkOnDisplay})
                  }
    }

    this.locationChecked = (location) => {
      let onDisplay = []
      const artworkOnDisplay = {...this.state.artworkOnDisplay}
      onDisplay = Object.keys(artworkOnDisplay).filter(fileName => {
        return artworkOnDisplay[fileName].location === location
      })
      return onDisplay.length > 0
    }

    this.showMenu = () => {
      //Mobile
      if(this.state.mobile){
        let delay = 1
        if(document.getElementById("ArtworkInfo")){
          if(document.getElementById("ArtworkInfo").classList.contains("info-up")){
            this.showInfo()

            delay += 100
          }
        }
        //if menu is open
        if(document.getElementById("TagsMenu").classList.contains("show-menu")){
          //if listitem drawer is open
          if(document.getElementsByClassName("scroll-down-listitem").length > 0){
            document.getElementsByClassName("scroll-down-listitem")[0].classList.remove("scroll-down-listitem")
            delay += 100
          }

          setTimeout(() => {
            if(document.getElementsByClassName("scroll-down").length > 0){
              document.getElementsByClassName("scroll-down")[0].classList.remove("scroll-down")
              delay += 50
            }
            setTimeout(() => {
              document.getElementById("TagsMenu").classList.remove("show-menu")
            }, delay);
          }, delay);

        }
        //if menu is closed
        else{
          document.getElementById("TagsMenu").classList.add("show-menu")
        }
      }
      //DESKTOP
      else{
        if(this.state.enlarge && this.state.enlarge.open){
          //if menu closed
          if(document.getElementById("TagsMenu").classList.contains("show-menu-desktop")){
            if(this.state.enlarge && this.state.enlarge.open){
              document.getElementById("TagsMenu").classList.remove("show-menu-desktop")
              setTimeout(() => {
                this.animateEnlarge(this.state.enlarge.background)
              }, 200);
            }
            else{
              document.getElementById("TagsMenu").classList.remove("show-menu-desktop")
              document.getElementById("imageSelect").style.width = "100%"
            }
            return
          }
          //if menu open
          else{
            // document.getElementById("TagsMenu").classList.add("show-menu-desktop")
            // document.getElementById("imageSelect").classList.remove("imageSelect-slide")
              if(this.state.enlarge.open){
                const imageSelectWidth = document.getElementById("imageSelect").offsetWidth
                const imageSelect = document.getElementById("imageSelect")
                imageSelect.style.width = `${imageSelectWidth+250}px`
                setTimeout(() => {
                  document.getElementById("TagsMenu").classList.add("show-menu-desktop")
                  // this.animateEnlarge(this.state.enlarge.foreground)
                }, 200);
              }
              else{
                document.getElementById("imageSelect").style.width = "100%"
              }
          }
        }
        else document.getElementById("TagsMenu").classList.toggle("show-menu-desktop")
      }
    }
    this.hideArtworkInfo = (e) => {
      if(e){
        e.stopPropagation()
      }
      const ArtworkInfo = document.getElementById("ArtworkInfo")
      if(ArtworkInfo && ArtworkInfo.classList.contains("info-up")){
        return 200
      }
      else { return 1}
    }

    this.closeEnlarge = (e, clearAll) => {
      if(e){
        e.stopPropagation()
      }
      const ArtworkInfo = document.getElementById("ArtworkInfo")

      if(ArtworkInfo && ArtworkInfo.classList.contains("info-up")){
        ArtworkInfo.classList.remove("info-up")
        if(ArtworkInfo)ArtworkInfo.classList.remove("show")
        if(!clearAll)
        return
      }
      if(!clearAll){
        if(document.getElementById("TagsMenu").classList.contains("show-menu")){
          this.showMenu()
          return
        }
      }
      // if(ArtworkInfo)ArtworkInfo.classList.remove("show")
        const delay = this.hideArtworkInfo()
        setTimeout(() => {
          const enlargeContainer = document.getElementById('enlargeContainer')

          //if mobile
          if(this.state.mobile){
            document.getElementById('imageSelect').classList.remove("side-scroll")
            setTimeout(() => {
              enlargeContainer.classList.remove("enlarge-scroll-down")
              if(ArtworkInfo){
                ArtworkInfo.classList.remove("show")
              }
            }, 400);
          }
          //if dekstop
          else{
            document.getElementById('imageSelect').style.width = `100%`

            setTimeout(() => {
              enlargeContainer.classList.remove("enlarge-scroll-left")
            }, 200);
          }

          if(!clearAll){
            const enlarge = {...this.state.enlarge}
            enlarge.open = false
            this.setState({enlarge})
          }
        }, delay);
    }
    this.viewNext = (direction) => {
      console.log("__________________________")
      console.log("view next")
      if(!this.state.enlarge){
        return
      }
        const file = this.state.enlarge.background
        let options = this.createFamilySequence(file)

        const familyName = options.state.enlarge.familySequence.familyName
        const familySequence = options.state.enlarge.familySequence.familySequence
        const familyIndex = options.state.enlarge.familySequence.familyIndex
        const commonSequence = options.state.enlarge.familySequence.commonSequence
        const commonIndex = options.state.enlarge.familySequence.commonIndex
        let sequence = null
        let nextIndex = null
        const findNextIndex = () => {
          //VIEW NEXT
          if(direction > 0){
            //if last in currentSequence reached
            if(familyIndex+1 > familySequence.length-1){
                const artworkOnDisplay = this.state.artworkOnDisplay
                let nextPicName = commonSequence.find(fileName => {
                  if(artworkOnDisplay[fileName].artworkFamily !== familyName){
                    if(commonSequence.indexOf(fileName) > commonIndex){
                      return commonSequence.indexOf(fileName)
                    }
                  }
                  return
                  })
              
                  if(!nextPicName){
                    nextPicName = commonSequence[0]
                  }

              // options.state.enlarge.familySequence.commonIndex = commonSequence.indexOf(nextPicName)
              let nextPic = this.state.artworkInfoData[nextPicName]

              console.log("nextPicName")
              console.log(nextPicName)


              options = this.createFamilySequence(nextPic)
              // sequence = options.state.enlarge.familySequence.familySequence
              sequence = commonSequence
              nextIndex = commonSequence.indexOf(nextPicName)
            }
            else{
              nextIndex = familyIndex+1
              options.state.enlarge.familySequence.familyIndex += 1
              sequence = options.state.enlarge.familySequence.familySequence
            }
          }
          //VIEW PREVIOUS
          else{
            //if current image is the first in the familySequence
            if(familyIndex-1 < 0 ){
              let prevPicName = null
              const artworkOnDisplay = this.state.artworkOnDisplay
              if(commonIndex === 0){
                prevPicName = commonSequence[commonSequence.length-1]
              }
              else{
                prevPicName = commonSequence[commonIndex-1]
              }


              // else{
              //   const filteredSequence = commonSequence.filter(fileName => {
              //       if(fileName === file.fileName || artworkOnDisplay[fileName].artworkFamily !== familyName){
              //         return fileName
              //       }
              //   })

              //   const nextFileIndex = filteredSequence.indexOf(file.fileName)-1
              //   prevPicName = filteredSequence[nextFileIndex]

              // }
              
              // if(!prevPicName){
              //   prevPicName = commonSequence[commonSequence.length-1]
              // }

            // options.state.enlarge.familySequence.commonIndex = commonSequence.indexOf(prevPicName)
            console.log(prevPicName)
            console.log("prevPicName")

            let prevPic = this.state.artworkInfoData[prevPicName]

            const familyArray = this.state.relatedArtwork[prevPic.artworkFamily].column.fileIds
            // const lastOfFamilyName = familyArray[familyArray.length-1]
            const lastOfFamilyFile = this.state.artworkInfoData[prevPicName]

              // options = this.createFamilySequence(prevPic)
              options = this.createFamilySequence(lastOfFamilyFile)

              sequence = options.state.enlarge.familySequence.familySequence
              nextIndex = sequence.indexOf(lastOfFamilyFile.fileName)
              // nextIndex = sequence.indexOf(prevPicName)

              // nextIndex = sequence.length-1
              options.reverse = true
            }
            else{
              nextIndex = familyIndex-1
              // const prevPicName = familySequence[nextIndex]
              // const prevPic = this.state.artworkInfoData[prevPicName]
              // options = this.createFamilySequence(prevPic)
              options.state.enlarge.familySequence.familyIndex -= 1
              sequence = options.state.enlarge.familySequence.familySequence
              options.reverse = true
            }
          }
        }

        findNextIndex()
        const nextPicName = sequence[nextIndex]
        console.log("sequence")
        console.log(sequence)
        console.log("nextIndex")
        console.log(nextIndex)
        const nextPic = this.state.artworkInfoData[nextPicName]

        if(!options.state.enlarge.familySequence.commonSequence.includes(nextPicName)){
          console.log("will not scroll")
          options.scroll = false
        }

        this.animateEnlarge(nextPic, options)
    }


    this.countWidth = (containerHeight, naturalHeight, naturalWidth, mobile) => {
      let maxWidth = document.getElementById("images").clientWidth - 120
      const naturalRatio = naturalWidth / naturalHeight

      if(mobile){
        maxWidth = document.getElementById("images").clientWidth
        const maxHeight = document.getElementById("images").clientHeight - 70

        let futureWidth = maxWidth
        let futureHeight = Math.round(futureWidth / naturalRatio)

        if(futureHeight > maxHeight){
          futureHeight = maxHeight
          futureWidth = Math.round(futureHeight * naturalRatio)
        }

        return {width: futureWidth, height: futureHeight}

      }
      const sizeRatio = naturalHeight / containerHeight

      let futureWidth = Math.round(naturalWidth / sizeRatio)
      let futureHeight = Math.round(futureWidth / naturalRatio)

      if(futureWidth > maxWidth){
        futureWidth = maxWidth
        futureHeight = Math.round(maxWidth / naturalRatio)
      }

      futureHeight = futureHeight > containerHeight ? containerHeight : futureHeight

      return {width: futureWidth, height: futureHeight}
    }
    this.animateEnlarge = (file, options) => {
      console.log("animate enlarge runs")
      console.log(file)
      this.enlarge.loaded = false
      let fgLoaded = null

      if(document.getElementById("TagsMenu").classList.contains("show-menu")){
        this.showMenu()
      }

      const background = document.getElementById("background")
      const foreground = document.getElementById("foreground")
      const container = document.getElementById("enlargeContainer")
      const imageSelect = document.getElementById("imageSelect")
      const images = document.getElementById("images")

      let enlarge = this.state.enlarge ? {...this.state.enlarge} : options.state.enlarge
      enlarge.previous = !enlarge.background ? file : enlarge.background
      enlarge.background = file

      let bgSrc = null
      let fgSrc = null

      if(this.state.mobile){
        bgSrc = file.thumbnailPath
        fgSrc = file.mobilePath
      }
      else{
        bgSrc = file.mobilePath
        fgSrc = file.desktopPath
      }

        const backgroundLoad = new Promise ((res, rej) => {
          if(!this.enlarge.loaded){
            document.querySelector("#background-img").src= bgSrc
            document.querySelector("#background-img").addEventListener('load', () => {
              this.enlarge.loaded = true
              res("background loaded")
            })
          }
          else{rej("alraedy laoded")}
        })

        backgroundLoad
          .then(res => {
            console.log(res)
            let futureSize = null

                  //COUNT FUTURE SIZES
                  //DESKTOP
                  if(!this.state.mobile){
                    //flip from mobile to desktop reset
                    if(document.getElementById('background').style.width !== "100%"){
                      document.getElementById('background').style.width = "100%"
                      document.getElementById('foreground').style.width = "100%"
                      // container.style.height = "calc(100% - 40px)"
                    }
                    futureSize = this.countWidth(container.clientHeight, file.naturalSize.naturalHeight, file.naturalSize.naturalWidth)
                  }
                  //MOBILES**************************************************************************************
                  else{
                    futureSize = this.countWidth(container.clientWidth, file.naturalSize.naturalHeight, file.naturalSize.naturalWidth, true)

                    background.style.height = `${futureSize.height}px`
                    foreground.style.height = `${futureSize.height}px`
                    background.style.width = `${futureSize.width}px`
                    foreground.style.width = `${futureSize.width}px`
                  }

                  let newState = options && options.state ? options.state : {...this.state}
                  newState.enlarge = enlarge

                  foreground.classList.add("fade-out")
                  let scrollToDelay = 0
                  //APPLY SIZE CHANGES
                  //MOBILE
                  if(this.state.mobile){
                    if(!container.classList.contains("enlarge-scroll-down")){
                      container.style.height = `${images.clientHeight - 90}px`
                      container.classList.add("enlarge-scroll-down")
                      scrollToDelay = 400
                      setTimeout(() => {
                          imageSelect.classList.add("side-scroll")
                      }, 200);
                    }
                    // console.log(`scrollTo? ${options.scroll}`)
                    // if(options){
                    //   const familySequence = options.state.enlarge.familySequence
                    //   const artworkOnDisplay = this.state.artworkOnDisplay
                    //   let scrollToId = null
                    //   if(artworkOnDisplay[file.fileName]){
                    //     scrollToId = file.fileName
                    //   }
                    //   //if currentFile is not visible in imageSelector
                    //   else{
                    //     scrollToId = Object.keys(artworkOnDisplay).find(fileName => {
                    //       if(artworkOnDisplay[fileName].artworkFamily === file.artworkFamily){
                    //         if(familySequence.commonSequence.indexOf(fileName) > familySequence.commonIndex){
                    //           return fileName
                    //         }
                    //       }
                    //     })
                    //     if(!scrollToId){
                    //       scrollToId = familySequence.commonSequence[familySequence.commonIndex]
                    //     }
                    //   }
                    //   setTimeout(() => {
                    //     console.log(`scrollTo ${scrollToId}`)
                    //     this.scrollToHorizontal(scrollToId, "imageSelect")
                    //   }, scrollToDelay);

                    // }
                  }
                  //DESKTOP
                  else{
                    if(!container.classList.contains("enlarge-scroll-left")){
                      container.classList.add("enlarge-scroll-left")
                      container.style.width = `${futureSize.width}px`
                      setTimeout(() => {
                        imageSelect.style.width = `${images.clientWidth - futureSize.width}px`
                      }, 200);
                    }
                    else{
                      //if enlargeContainer will shrink
                      if(this.state.enlarge.currentWidth && this.state.enlarge.currentWidth > futureSize.width && this.state.enlarge.open){

                        imageSelect.style.width = `${images.clientWidth - futureSize.width}px`
                        setTimeout(() => {
                          container.style.width = `${futureSize.width}px`
                        }, 400);
                      }
                      //
                      else{
                        container.style.width = `${futureSize.width}px`
                        setTimeout(() => {
                          imageSelect.style.width = `${images.clientWidth - futureSize.width}px`
                        }, 400);
                      }
                    }
                    background.style.height = `${futureSize.height}px`
                    foreground.style.height = `${futureSize.height}px`
                    // container.style.width = `${futureSize.width}px`
                  }
                  console.log(`scrollTo? ${options.scroll}`)
                  if(options){
                    const familySequence = options.state.enlarge.familySequence
                    const artworkOnDisplay = this.state.artworkOnDisplay
                    let scrollToId = null
                    if(artworkOnDisplay[file.fileName]){
                      scrollToId = file.fileName
                    }
                    //if currentFile is not visible in imageSelector
                    else{
                      scrollToId = Object.keys(artworkOnDisplay).find(fileName => {
                        if(artworkOnDisplay[fileName].artworkFamily === file.artworkFamily){
                          if(familySequence.commonSequence.indexOf(fileName) > familySequence.commonIndex){
                            return fileName
                          }
                        }
                      })
                      if(!scrollToId){
                        scrollToId = familySequence.commonSequence[familySequence.commonIndex]
                      }
                    }
                    setTimeout(() => {
                      console.log(`scrollTo ${scrollToId}`)
                      this.scrollToHorizontal(scrollToId, "imageSelect")
                    }, scrollToDelay);

                  }

                    newState.enlarge.foreground = enlarge.background
                    newState.enlarge.currentWidth = futureSize.width
                    newState.enlarge.currentHeight = images.clientHeight - 90
                    newState.enlarge.open = true

                    this.setState(newState)

                     const loadForeground = () => {

                       return new Promise((res, rej) => {
                         document.querySelector("#foreground-img").src= fgSrc
                         document.querySelector("#foreground-img").addEventListener('load', () => {
                           if(!fgLoaded){
                             console.log("foregound loads")
                             foreground.classList.remove("fade-out")
                             this.enlarge.loaded = false
                              fgLoaded = true
                              // this.setState(newState)
                            res("finished")
                           }
                           else{rej(fgLoaded)}
                         });
                       })
                     }

                     setTimeout(() => {

                       loadForeground()
                       .then(res => {
                         console.log(res)
                         document.getElementById("ArtworkInfo").classList.add("show")
                        })
                        .catch(rej => {
                          console.log("enlarge.fgLoaded")
                          console.log(rej)
                        })
                        this.scrollToHorizontal(`previewBubble-${file.fileName}`, "previewBubble-wrapper", {increment: 50})

                     }, 200);
                     return
          })
          .catch(rej => {
            console.log(rej)
            return
          })
    }

    this.scrollToHorizontal = (id, parent_id, options) => {
      console.log("scrollToHorizontal")
      let scrollTo = {}
      // let scrollTo = {behavior: 'smooth'}
      if(!document.getElementById(parent_id)){
        console.log(`${parent_id} was not found`)
        return
      }
      if(!id){
        scrollTo.left = 0
        document.getElementById(parent_id).scrollTo(scrollTo)
        return
      }
      let scrollDelay = document.getElementById(parent_id).scrollLeft > 0 ? 200 : 800
      if(this.state.mobile){
        setTimeout(() => {
          if(document.getElementById(id)){
            let scrollIncrement = options && options.increment ? options.increment : 5
            scrollTo.left = document.getElementById(id).getBoundingClientRect().x - scrollIncrement
            if(document.getElementById(parent_id).scrollLeft > 0){
              scrollTo.left += document.getElementById(parent_id).scrollLeft
            }
            console.log("scrollTo.left")
            console.log(scrollTo.left)
            document.getElementById(parent_id).scrollTo(scrollTo)
          }
        }, scrollDelay);
      }
    }

    this.createFamilySequence = (file) => {
      //THIS WILL BE THE RETURNED OBJECT
      let options = {state: null, scroll: null }
      let familySequence = {}

      const allVisible =  Array.from(document.querySelectorAll(".FilePreview--imageContainer:not(.FilePreview--imageContainer__empty)")).map(container => container.childNodes[0].id)
      let newState = {...this.state}

      const familyName = file.artworkFamily
      const currentImage = file.fileName

      let commonIndex = this.state.enlarge ?
      allVisible.indexOf(currentImage) < 0 ?
        this.state.enlarge.familySequence.commonIndex
        : allVisible.indexOf(currentImage)
      : 0

      //IF ARTWORK BELONGS TO FAMILY THAT IS CURRENTLY VIEW
      if(this.state.enlarge && this.state.enlarge.familySequence.familyName === familyName){

        const currentSequence = this.state.enlarge.familySequence

        let familyIndex = currentSequence.familySequence.indexOf(currentImage)

        familySequence = {
          "familyName": familyName,
          "familySequence": currentSequence.familySequence,
          "familyIndex": familyIndex,
          "commonSequence": currentSequence.commonSequence,
          "commonIndex": commonIndex
        }
      }

      //IF ARTWORK FAMILY NEEDS TO SEQUENCE/HAS NOT BEEN VIEWED
      else{

        const recordedSequence = this.state.relatedArtwork[familyName].column.fileIds
        const familyIndex = this.state.relatedArtwork[familyName].column.fileIds.indexOf(currentImage)

        // let newFamilySequence_start = recordedSequence.slice(0, familyIndex)
        // let newFamilySequence_end = recordedSequence.slice(familyIndex)
        // let newFamilySequence = [...newFamilySequence_end, ...newFamilySequence_start]
        let newFamilySequence = recordedSequence


        familySequence = {
          "familyName": familyName,
          "familySequence": newFamilySequence,
          "familyIndex": 0,
          "commonSequence": allVisible,
          "commonIndex": commonIndex
        }
      }

      // console.log("recordedSequence")
      // console.log(recordedSequence)

      // console.log("newFamilySequence")
      // console.log(newFamilySequence)



      if(!newState.enlarge){
        newState.enlarge = {}
      }
      newState.enlarge.familySequence = familySequence
      options.state = newState

      //scroll if the image is visible in the ImageSelector
      options.scroll = allVisible.indexOf(currentImage) < 0 ? false : true

      return options
    }

    this.loadEnlarge = (e, id) => {
      console.log("load enlarge")
      e.stopPropagation()

      const file = this.state.artworkInfoData[id]

      const options = this.createFamilySequence(file)

      return this.animateEnlarge(file, options)
    }


    this.showInfo = () => {
      if(this.state.enlarge && !this.state.enlarge.open){
        return
      }
      console.log("run show info")
      const info = document.getElementById("ArtworkInfo")
      if(!this.state.mobile && !info.classList.contains("info-up")){
        if(!info.classList.contains("info-up")){
          info.classList.add("info-up")
        }
        else info.classList.remove("info-up")
        // if(!info.classList.contains("show")){
        //   info.classList.add("show")
        // }
        // else{
        //   info.classList.remove("show")
        // }
        return
      }

      // document.getElementById("ArtworkInfo").classList.remove("ArtworkInfo-toggleTags")
      if(!info.classList.contains('show')){
        let counter = 1
        if(this.state.mobile){
          if(document.getElementById("TagsMenu").classList.contains("show-menu")){
            this.showMenu()
            // document.getElementById("TagsMenu").classList.remove("show-menu")
            counter = 1
          }
        }
        setTimeout(() => {
          setTimeout(() => {
            info.classList.add('info-up')
          }, 100);
          info.classList.add('show')
        }, counter);
      }

      else{
        let delay = 0
        if(document.getElementById("ArtworkInfo").classList.contains("ArtworkInfo-toggleTags")){
            document.getElementById("ArtworkInfo").classList.remove("ArtworkInfo-toggleTags")
          delay += 150
        }
        // info.classList.remove('info-up')
        setTimeout(() => {
          info.classList.remove('info-up')
          // info.classList.remove('show')
        }, delay);
      }
    }
    this.toggleMobile = () => {
      const container = document.getElementById("enlargeContainer")
      const images = document.getElementById("images")
      const imageSelect = document.getElementById("imageSelect")
      let mobile = null
      if(document.documentElement.clientWidth < 721){
        mobile = true
          container.style.height = `${images.clientHeight - 90}px`
          document.getElementById("foreground").style.height = "auto"
          document.getElementById("background").style.height = "auto"
          Array.from(document.getElementsByClassName("scroll-down")).forEach(item => {
            item.classList.remove("scroll-down")
          })
          container.classList.add("enlarge-scroll-down")
      }
      else{
        mobile = false
        container.style.height = "calc(100% - 50px)"
        container.style.width = `${this.state.enlarge ? this.state.enlarge.background.currentWidth : 0}px`
      }

      if(this.state.enlarge && this.state.enlarge.open){
          setTimeout(() => {
            let newState = {...this.state}
            newState.mobile = mobile
            if(mobile){
              imageSelect.classList.add("side-scroll")
              this.scrollToHorizontal(this.state.enlarge ? this.state.enlarge.background.fileName : null, "imageSelect")
            }
            else{
                // this.animateEnlarge(this.state.enlarge.background, {state: newState})
            }
          }, 400);
        }

      // if(this.state.enlarge && this.state.enlarge.open){
      //   let newState = {...this.state}
      //   newState.mobile = mobile
      //   this.animateEnlarge(this.state.enlarge.background, {state: newState})
      // }
      return mobile
    }
    this.onTouchStart= (e) => {
      const touches = e.touches
      const touch = {"x": touches[0].clientX, "y": touches[0].clientY}
      this.setState({touch})
    }
    this.lazyLoadImages = () => {
      const images = document.querySelectorAll(".imageSelect-FilePreview")

      const preloadImage = (img) => {
        const src = img.getAttribute("data-src")
        if(!src){
          return
        }
        img.src=src
      }

      const imgOptions = {
        threshold: 0,
        margin: "0px 0px 300px 0px"
      }

      const imgObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach(entry => {
          if(!entry.isIntersecting){
            return
          }
          else{
            preloadImage(entry.target);
            imgObserver.unobserve(entry.target)
          }
        }, imgOptions)
      })

      images.forEach(image => {
        imgObserver.observe(image)
      })
    }
    this.getArtworkInfo = () => {
      return new Promise((resolve, rej) => {

          let serverFileNames = null;
          
          //get an array of all file names in the server
          axios.get('/fetchImages')
              .then(res => {
                  serverFileNames = res.data
                  let newServerFileName = res.data.map(name => {
                    let start = name.substring(0, name.indexOf("-thumbnail"))
                    let cutout = "-thumbnail"
                    let extension = name.substring(name.indexOf("-thumbnail") + cutout.length)
                    let newName = `${start}${extension}`
                    return newName
                  })

                  serverFileNames = newServerFileName
                  axios.get('/api/artworkInfo')
                      .then(res => {
                          let databaseFiles = {}
                          let usedNames = []
                          
                          //check that a record has a file in the server
                          serverFileNames.forEach(fileName => {
                              res.data.forEach(obj => {
                                  if(obj.fileName === fileName && !usedNames.includes[fileName]){
                                      usedNames = [...usedNames, fileName]
                                   databaseFiles = {...databaseFiles, [fileName]: obj}
                                  databaseFiles[fileName].useFamilySetup = false
                              }
                          })
                          })

                          //add an array of all file object
                          // renderFiles.fileNames = Object.keys(renderFiles).filter(fileName => fileName !== "fileList")

                          resolve(databaseFiles)
                      })
                      .catch(err => {
                        console.log("getArtworkInfo err")
                        console.log(err)
                      })
              })   
              .catch(err => {
                console.log("fetch images err")
                console.log(err)
              })
      })
    }
    this.getRelatedArtwork = (artworkFamily, newState) => {

      let relatedArtwork = {}
      //get all records from the selected family from database
      return new Promise((resolve, reject) => {
          // if(this.state.relatedArtwork[value]){
          //     relatedArtwork = {...this.state.relatedArtwork}
          // }

          axios.get(`/api/artworkInfo/${artworkFamily}`)
              .then(res =>{

              //for each fileData object in res.data array 
                  res.data.forEach((obj, index) => {
                  //paste all properties of this file object unto relatedArtwork object
                  Object.keys(obj).forEach(property => {
                          relatedArtwork = {
                              ...relatedArtwork,
                                  [obj.fileName]: {
                                      ...relatedArtwork[obj.fileName],
                                      [property]: obj[property]
                                  }
                              }
                      })
                  })        
                  let fileIds = Object.keys(relatedArtwork).map(obj => null)
                  Object.keys(relatedArtwork).forEach(fileName => {
                      if(relatedArtwork[fileName].familyDisplayIndex < 0){
                        fileIds.push(fileName)
                      }
                      else{
                        fileIds[relatedArtwork[fileName].familyDisplayIndex] = fileName
                      }
                  })
                  fileIds = fileIds.filter(fileName => fileName !== null || false)
                  let finalRelatedArtwork = {
                          files: relatedArtwork,
                          column: {
                              // fileIds: Object.keys(relatedArtwork).map(objName => objName),
                              fileIds,
                              id: `${artworkFamily}-relatedArtworks`
                          },
                          columnOrder: [`${artworkFamily}-relatedArtworks`]
                  };
                  
                  
                  resolve(finalRelatedArtwork)
              })
      }) 
    }


}//END OF CONTSTRUCTOR

    // componentDidMount(){
    //         window.addEventListener("resize", ()=>{
    //           this.setState({mobile: this.toggleMobile()})
    //         })
    //     }

    componentDidMount(){
      console.log("compoenent did mount")
      let newState = {...this.state}

      this.setState({showModal: true, modalMessage: "loading data"})

      // let Themes = new Promise ((resolve,rej) => {
      //     axios.get('/api/themes')
      //     .then( res => {
      //     newState.themesData = res.data.list
      //     resolve()
      //     })
      //     .catch(err => {
               
      //         // document.location.reload(true)
      //     })
      // })

      let FamilyList = new Promise ((resolve, rej) => {
          axios.get('/api/familySetup')
          .then(res => {
              let familyList = Object.keys(res.data).map(obj => {
                  return res.data[obj].artworkFamily
              })
              newState.artworkFamilyList = familyList
              console.log("Families loaded")
              console.log(res)
              resolve()
          })
          .catch(err => {
               rej(err)
               console.log("family list laod error")
              // document.location.reload(true)
          })
      })

      let Categories = new Promise ((resolve, rej) => {
          FamilyList
          .then(res => {
                  axios.get('/api/categories')
                  .then(res => {
      
                          let categoryNames = Object.values(res.data).map(obj => obj.category)
                          let categoryObj = {}
                          categoryNames.forEach(categoryName => {
                              const currentObj = res.data.find(item => item.category === categoryName)
                              return categoryObj = {...categoryObj, [categoryName]: Object.keys(currentObj.subcategory)}
                          })
      
                      newState.categoriesData = res.data
                      newState.categoriesOptionList = {}
                      newState.categoriesOptionList.data = categoryObj
      
                      const progressLength = newState.artworkFamilyList.length
                      let counter = 0
                      newState.artworkFamilyList.forEach(familyName => {
                          this.getRelatedArtwork(familyName, newState)
                          .then(res => {
                            if(!newState.relatedArtwork){
                              newState.relatedArtwork = {}
                            }
                            newState.relatedArtwork[familyName] = res
                            counter += 1
                            if(counter === progressLength){
                              resolve()
                            }
                          })
                          .catch(err => {
                            console.log("getrelated artwork err")
                            console.log(err)
                            rej("getrelated artwork err")
                          })
                      })
                      // resolve()
                  })
                  .catch(err => {
                       console.log("get categories err")
                       console.log(err)
                       rej("get categories err")
                      // document.location.reload(true)
                  })
          })
          .catch(err => {
            console.log("categories error")
            console.log(err)
            rej(err)
          })
      }) 

      let ArtworkInfo = new Promise ((resolve, rej) => {
          this.getArtworkInfo()
              .then(res => {
                  console.log("this.getArtworkInfo res")
                  console.log(res)
                  newState.artworkInfoData = res
                  let onDisplay = {}
                  Object.keys(res).forEach(fileName => {
                    if(res[fileName].displayMain){
                      onDisplay = {...onDisplay, [fileName]: res[fileName]}
                    }
                  })
                  
                  let allThemes = []
                  Object.keys(res).forEach(objName => {
                      allThemes = [...allThemes, ...res[objName].themes]
                  })
                  let allThemesSet = new Set(allThemes)
                  allThemesSet = Array.from(allThemesSet)

                  let artworkByTheme = {}

                  let themesArr = Object.keys(res).map(name => res[name])

                  allThemesSet.forEach(theme => {
                    themesArr.forEach(obj => {
                      if(obj.themes.includes(theme)){
                        if(!artworkByTheme[theme]){
                          artworkByTheme[theme] = []
                        }
                        if(obj.displayTriggers.themes && obj.displayTriggers.themes.includes(theme)){
                          artworkByTheme[theme] = [...artworkByTheme[theme], obj.fileName]
                        }
                      }
                    })
                  })

                  let artworkOnDisplay = {}
                  let displayThemes = ["metal", "social", "tools", "cloud"]
                  let hideThemes = ["celestial body"]
                  let artworkNames = Object.keys(onDisplay)
                  artworkNames.forEach(fileName => {
                    displayThemes.forEach(theme => {
                      if(onDisplay[fileName].themes.includes(theme)){
                        hideThemes.forEach(hideTheme => {
                          if(!onDisplay[fileName].themes.includes(hideTheme)){
                            artworkOnDisplay[fileName] = onDisplay[fileName]
                          }
                        })
                      }
                    })
                  })

                  let years = []
                  let locations = []
                  let artworkByYear = {}
                  let artworkByLocation = {}
              
                  const allFiles = Object.keys(res)
              
                  allFiles.forEach(fileName => {
                      const file = res[fileName]
                      if(file.year){
                          years = [...years, file.year]
                          if(!artworkByYear[file.year]){
                            artworkByYear[file.year] = []
                          }
                          artworkByYear = {...artworkByYear, [file.year]: [...artworkByYear[file.year], fileName]}
                      }
                      if(file.location){
                          locations = [...locations, file.location]
                          if(!artworkByLocation[file.location]){
                            artworkByLocation[file.location] = []
                          }
                          artworkByLocation = {...artworkByLocation, [file.location]: [...artworkByLocation[file.location], fileName]}
                      }
                  })
              
                  years = new Set(years)
                  years = Array.from(years).sort()
              
                  locations = new Set(locations)
                  locations = Array.from(locations).sort()

                  const yearLocOnDisplay = {years: artworkByYear, locations: artworkByLocation}

                  newState.yearLocation = {years, locations, "visible": yearLocOnDisplay, "all": yearLocOnDisplay}
                  newState.artworkOnDisplay = artworkOnDisplay
                  newState.visibleArtwork = onDisplay
                  newState.themesOnDisplay = artworkByTheme
                  resolve()
              })
              .catch(err => {
                console.log("getArtworkInfo err")
                console.log(err)
                rej(err)
              })
      })

      let serverFiles = new Promise ((resolve, rej) => {
        axios.get('/fetchimages')
          .then(res => {
            newState.serverData = res
            resolve()
          })
          .catch(err => rej(err))
      })

      Promise.all([
        serverFiles,
        Categories, 
        ArtworkInfo, 
        // Themes, 
      ])
      .then(res => {
          newState.showModal = false
          newState.modalMessage = null
          newState.mobile = this.toggleMobile()
          window.addEventListener("resize", ()=>{this.setState({mobile: this.toggleMobile()})})
          console.log("newState")
          console.log(newState)
          this.setState(newState)
      })
      .catch(err => {
            console.log("promise all err")
            console.log(err)
      })
  }

    render(){
    return(
        <Context.Provider value={ {
            state: this.state,

            filterByCategory: this.filterByCategory,
            filterBySubcategory: this.filterBySubcategory,
            filterByListitem: this.filterByListitem,
            categoryChecked: this.categoryChecked,
            subcategoryChecked: this.subcategoryChecked,
            listitemChecked: this.listitemChecked,

            enlarge: this.enlarge,
            loadEnlarge: this.loadEnlarge,
            closeEnlarge: this.closeEnlarge,
            hideArtworkInfo: this.hideArtworkInfo,

            viewNext: this.viewNext,
            viewPrev: this.viewPrev,

            showInfo: this.showInfo,

            filterAllThemes: this.filterAllThemes,
            filterByTheme: this.filterByTheme,
            themeChecked: this.themeChecked,

            filterByYear: this.filterByYear,
            yearChecked: this.yearChecked,
            filterByLocation: this.filterByLocation,
            locationChecked: this.locationChecked,

            showMenu: this.showMenu,
            toggleMobile: this.toggleMobile,
            onTouchStart: this.onTouchStart,

            lazyLoadImages: this.lazyLoadImages,
            scrollToHorizontal: this.scrollToHorizontal,

            readImageDir: this.readImageDir,
            changeFileName: this.changeFileName,
            onChange: this.onChange,
            addNew: this.addNew,

            } }>
        {this.props.children}
        </Context.Provider>
    )
    }

}

