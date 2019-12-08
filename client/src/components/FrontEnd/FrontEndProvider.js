import React from 'react';
import axios from 'axios';

export const Context = React.createContext();

export class Provider extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        // FRONTEND: null,
        fileData: {
            files: {},
            column: {
                id: 'column-1',
                fileIds: []
            },
            columnOrder: ['column-1']
        },
        relatedArtwork: {},
        DUMMYstate: {
            "fileData": {
              "files": {},
              "column": {
                "id": "column-1",
                "fileIds": []
              },
              "columnOrder": [
                "column-1"
              ]
            },
            "relatedArtwork": {
              "freshOne": {
                "files": {},
                "column": {
                  "fileIds": [],
                  "id": "freshOne-relatedArtworks"
                },
                "columnOrder": [
                  "freshOne-relatedArtworks"
                ]
              },
              "NEw_version02": {
                "files": {},
                "column": {
                  "fileIds": [],
                  "id": "NEw_version02-relatedArtworks"
                },
                "columnOrder": [
                  "NEw_version02-relatedArtworks"
                ]
              },
              "family_desc": {
                "files": {},
                "column": {
                  "fileIds": [],
                  "id": "family_desc-relatedArtworks"
                },
                "columnOrder": [
                  "family_desc-relatedArtworks"
                ]
              },
              "gradient_acephale": {
                "files": {},
                "column": {
                  "fileIds": [],
                  "id": "gradient_acephale-relatedArtworks"
                },
                "columnOrder": [
                  "gradient_acephale-relatedArtworks"
                ]
              },
              "EMPTY CATEGORY": {
                "files": {},
                "column": {
                  "fileIds": [],
                  "id": "EMPTY CATEGORY-relatedArtworks"
                },
                "columnOrder": [
                  "EMPTY CATEGORY-relatedArtworks"
                ]
              },
              "dadadada": {
                "files": {},
                "column": {
                  "fileIds": [],
                  "id": "dadadada-relatedArtworks"
                },
                "columnOrder": [
                  "dadadada-relatedArtworks"
                ]
              },
              "without info": {
                "files": {},
                "column": {
                  "fileIds": [],
                  "id": "without info-relatedArtworks"
                },
                "columnOrder": [
                  "without info-relatedArtworks"
                ]
              },
              "with description": {
                "files": {},
                "column": {
                  "fileIds": [],
                  "id": "with description-relatedArtworks"
                },
                "columnOrder": [
                  "with description-relatedArtworks"
                ]
              },
              "withoutCategory": {
                "files": {},
                "column": {
                  "fileIds": [],
                  "id": "withoutCategory-relatedArtworks"
                },
                "columnOrder": [
                  "withoutCategory-relatedArtworks"
                ]
              },
              "emtyyyyy": {
                "files": {},
                "column": {
                  "fileIds": [],
                  "id": "emtyyyyy-relatedArtworks"
                },
                "columnOrder": [
                  "emtyyyyy-relatedArtworks"
                ]
              },
              "note10": {
                "files": {
                  "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg": {
                    "artworkFamily": "note10",
                    "displayMain": null,
                    "themes": [
                      "Zamzung",
                      "social",
                      "selfie",
                      "note10"
                    ],
                    "seeAlso": [],
                    "location": "",
                    "year": "",
                    "_id": "5dc58b3232c7244c586efe0b",
                    "category": {
                      "medium": {
                        "graphics": [
                          "cg"
                        ]
                      }
                    },
                    "filePath": "/uploads/im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg",
                    "fileName": "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg",
                    "fileType": "image/jpeg",
                    "familyDescription": "",
                    "artworkTitle": null,
                    "artworkDescription": null,
                    "familyDisplayIndex": 1,
                    "__v": 0
                  },
                  "im0049_explore_social-media-videos_feature-item2_mo_720x680.jpg": {
                    "artworkFamily": "note10",
                    "displayMain": null,
                    "themes": [
                      "Zamzung",
                      "social",
                      "selfie",
                      "note10"
                    ],
                    "seeAlso": [],
                    "location": null,
                    "year": null,
                    "_id": "5dc59a83373fb5607084df41",
                    "category": {
                      "medium": {
                        "graphics": [
                          "cg"
                        ]
                      }
                    },
                    "filePath": "/uploads/im0049_explore_social-media-videos_feature-item2_mo_720x680.jpg",
                    "fileName": "im0049_explore_social-media-videos_feature-item2_mo_720x680.jpg",
                    "fileType": "image/jpeg",
                    "familyDescription": null,
                    "artworkTitle": null,
                    "artworkDescription": null,
                    "familyDisplayIndex": 2,
                    "__v": 0
                  },
                  "im0049_explore_social-media-videos_feature-item1_mo_720x680.jpg": {
                    "artworkFamily": "note10",
                    "displayMain": null,
                    "themes": [
                      "Zamzung",
                      "social",
                      "selfie",
                      "note10"
                    ],
                    "seeAlso": [],
                    "location": null,
                    "year": null,
                    "_id": "5dc59a86373fb5607084df42",
                    "category": {
                      "medium": {
                        "graphics": [
                          "cg"
                        ]
                      }
                    },
                    "filePath": "/uploads/im0049_explore_social-media-videos_feature-item1_mo_720x680.jpg",
                    "fileName": "im0049_explore_social-media-videos_feature-item1_mo_720x680.jpg",
                    "fileType": "image/jpeg",
                    "familyDescription": null,
                    "artworkTitle": null,
                    "artworkDescription": null,
                    "familyDisplayIndex": 3,
                    "__v": 0
                  },
                  "im0049_explore_social-media-videos_article-hero_pc_920x518.jpg": {
                    "artworkFamily": "note10",
                    "displayMain": null,
                    "themes": [
                      "Zamzung",
                      "social",
                      "selfie",
                      "note10"
                    ],
                    "seeAlso": [
                      "im0049_explore_social-media-videos_feature-item1_mo_720x680.jpg",
                      "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg",
                      "im0049_explore_social-media-videos_feature-item3_pc_330x440.jpg"
                    ],
                    "location": null,
                    "year": null,
                    "_id": "5dc956d3cf0c7e5c841ec175",
                    "category": {
                      "medium": {
                        "graphics": [
                          "cg"
                        ]
                      }
                    },
                    "filePath": "/uploads/im0049_explore_social-media-videos_article-hero_pc_920x518.jpg",
                    "fileName": "im0049_explore_social-media-videos_article-hero_pc_920x518.jpg",
                    "fileType": "image/jpeg",
                    "familyDescription": null,
                    "artworkTitle": null,
                    "artworkDescription": null,
                    "familyDisplayIndex": 4,
                    "__v": 0
                  },
                  "lt-galaxy-buds-r170-sm-r170nzkaseb-frontblack-146371849.png": {
                    "artworkFamily": "note10",
                    "displayMain": null,
                    "themes": [
                      "Zamzung",
                      "social",
                      "selfie",
                      "note10"
                    ],
                    "seeAlso": [],
                    "location": null,
                    "year": null,
                    "_id": "5dc95703cf0c7e5c841ec176",
                    "category": {
                      "medium": {
                        "graphics": [
                          "cg"
                        ]
                      }
                    },
                    "filePath": "/uploads/lt-galaxy-buds-r170-sm-r170nzkaseb-frontblack-146371849.png",
                    "fileName": "lt-galaxy-buds-r170-sm-r170nzkaseb-frontblack-146371849.png",
                    "fileType": "image/png",
                    "familyDescription": null,
                    "artworkTitle": null,
                    "artworkDescription": null,
                    "familyDisplayIndex": 0,
                    "__v": 0
                  }
                },
                "column": {
                  "fileIds": [
                    "lt-galaxy-buds-r170-sm-r170nzkaseb-frontblack-146371849.png",
                    "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg",
                    "im0049_explore_social-media-videos_feature-item2_mo_720x680.jpg",
                    "im0049_explore_social-media-videos_feature-item1_mo_720x680.jpg",
                    "im0049_explore_social-media-videos_article-hero_pc_920x518.jpg"
                  ],
                  "id": "note10-relatedArtworks"
                },
                "columnOrder": [
                  "note10-relatedArtworks"
                ]
              },
              "EXPLORE": {
                "files": {
                  "im0049_explore_social-media-videos_content-embed4_mo_720x405.jpg": {
                    "artworkFamily": "EXPLORE",
                    "displayMain": null,
                    "themes": [
                      "Kamil",
                      "crescent"
                    ],
                    "seeAlso": [
                      "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                      "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg"
                    ],
                    "location": "",
                    "year": "",
                    "_id": "5dc59c4d2456105b34cecff1",
                    "category": {
                      "medium": {
                        "graphics": []
                      }
                    },
                    "filePath": "/uploads/im0049_explore_social-media-videos_content-embed4_mo_720x405.jpg",
                    "fileName": "im0049_explore_social-media-videos_content-embed4_mo_720x405.jpg",
                    "fileType": "image/jpeg",
                    "familyDescription": "",
                    "artworkTitle": null,
                    "artworkDescription": null,
                    "familyDisplayIndex": 0,
                    "__v": 0
                  },
                  "im0049_explore_social-media-videos_content-embed1_mo_720x405.jpg": {
                    "artworkFamily": "EXPLORE",
                    "displayMain": null,
                    "themes": [
                      "Kamil",
                      "crescent"
                    ],
                    "seeAlso": [
                      "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                      "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg"
                    ],
                    "location": "",
                    "year": "",
                    "_id": "5dc59e6bae2633255c80c09e",
                    "category": {
                      "medium": {
                        "photo": [
                          "color"
                        ]
                      }
                    },
                    "filePath": "/uploads/im0049_explore_social-media-videos_content-embed1_mo_720x405.jpg",
                    "fileName": "im0049_explore_social-media-videos_content-embed1_mo_720x405.jpg",
                    "fileType": "image/jpeg",
                    "familyDescription": "",
                    "artworkTitle": null,
                    "artworkDescription": null,
                    "familyDisplayIndex": 1,
                    "__v": 0
                  },
                  "im0049_explore_social-media-videos_content-embed2_mo_720x405.jpg": {
                    "artworkFamily": "EXPLORE",
                    "displayMain": null,
                    "themes": [
                      "Kamil",
                      "crescent"
                    ],
                    "seeAlso": [
                      "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                      "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg",
                      "im0049_explore_social-media-videos_content-embed4_mo_720x405.jpg",
                      "im0049_explore_social-media-videos_content-embed1_mo_720x405.jpg"
                    ],
                    "location": null,
                    "year": null,
                    "_id": "5dc9544be639c226c8f7657c",
                    "category": {
                      "public": {}
                    },
                    "filePath": "/uploads/im0049_explore_social-media-videos_content-embed2_mo_720x405.jpg",
                    "fileName": "im0049_explore_social-media-videos_content-embed2_mo_720x405.jpg",
                    "fileType": "image/jpeg",
                    "familyDescription": null,
                    "artworkTitle": null,
                    "artworkDescription": null,
                    "familyDisplayIndex": 2,
                    "__v": 0
                  },
                  "im0049_explore_social-media-videos_content-embed6_pc_920x518.jpg": {
                    "artworkFamily": "EXPLORE",
                    "displayMain": null,
                    "themes": [
                      "Kamil",
                      "crescent"
                    ],
                    "seeAlso": [
                      "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                      "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg"
                    ],
                    "location": null,
                    "year": null,
                    "_id": "5dc95478e639c226c8f7657e",
                    "category": {
                      "medium": {
                        "graphics": []
                      }
                    },
                    "filePath": "/uploads/im0049_explore_social-media-videos_content-embed6_pc_920x518.jpg",
                    "fileName": "im0049_explore_social-media-videos_content-embed6_pc_920x518.jpg",
                    "fileType": "image/jpeg",
                    "familyDescription": null,
                    "artworkTitle": null,
                    "artworkDescription": null,
                    "familyDisplayIndex": 3,
                    "__v": 0
                  },
                  "im0049_explore_social-media-videos_feature-item3_pc_330x440.jpg": {
                    "artworkFamily": "EXPLORE",
                    "displayMain": null,
                    "themes": [
                      "Kamil",
                      "crescent"
                    ],
                    "seeAlso": [
                      "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                      "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg"
                    ],
                    "location": null,
                    "year": null,
                    "_id": "5dc9565ddb47da39b0040c64",
                    "category": {
                      "medium": {
                        "sculpture": []
                      }
                    },
                    "filePath": "/uploads/im0049_explore_social-media-videos_feature-item3_pc_330x440.jpg",
                    "fileName": "im0049_explore_social-media-videos_feature-item3_pc_330x440.jpg",
                    "fileType": "image/jpeg",
                    "familyDescription": null,
                    "artworkTitle": null,
                    "artworkDescription": null,
                    "familyDisplayIndex": 4,
                    "__v": 0
                  }
                },
                "column": {
                  "fileIds": [
                    "im0049_explore_social-media-videos_content-embed4_mo_720x405.jpg",
                    "im0049_explore_social-media-videos_content-embed1_mo_720x405.jpg",
                    "im0049_explore_social-media-videos_content-embed2_mo_720x405.jpg",
                    "im0049_explore_social-media-videos_content-embed6_pc_920x518.jpg",
                    "im0049_explore_social-media-videos_feature-item3_pc_330x440.jpg"
                  ],
                  "id": "EXPLORE-relatedArtworks"
                },
                "columnOrder": [
                  "EXPLORE-relatedArtworks"
                ]
              },
              "explore": {
                "files": {},
                "column": {
                  "fileIds": [],
                  "id": "explore-relatedArtworks"
                },
                "columnOrder": [
                  "explore-relatedArtworks"
                ]
              },
              "3ksplore": {
                "files": {
                  "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg": {
                    "artworkFamily": "3ksplore",
                    "displayMain": null,
                    "themes": [],
                    "seeAlso": [],
                    "location": null,
                    "year": null,
                    "_id": "5dc59d7a2456105b34cecff4",
                    "category": {
                      "studio": {
                        "wip": [
                          "progress"
                        ]
                      }
                    },
                    "filePath": "/uploads/im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                    "fileName": "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                    "fileType": "image/jpeg",
                    "familyDescription": null,
                    "artworkTitle": null,
                    "artworkDescription": null,
                    "familyDisplayIndex": 0,
                    "__v": 0
                  },
                  "56028.jpg": {
                    "artworkFamily": "3ksplore",
                    "displayMain": null,
                    "themes": [],
                    "seeAlso": [
                      "im0049_explore_social-media-videos_content-embed4_mo_720x405.jpg",
                      "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg"
                    ],
                    "location": null,
                    "year": null,
                    "_id": "5dc86d2a1bb6b7145413dff6",
                    "category": {
                      "medium": {
                        "graphics": []
                      }
                    },
                    "filePath": "/uploads/56028.jpg",
                    "fileName": "56028.jpg",
                    "fileType": "image/jpeg",
                    "familyDescription": null,
                    "artworkTitle": null,
                    "artworkDescription": null,
                    "familyDisplayIndex": 1,
                    "__v": 0
                  }
                },
                "column": {
                  "fileIds": [
                    "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                    "56028.jpg"
                  ],
                  "id": "3ksplore-relatedArtworks"
                },
                "columnOrder": [
                  "3ksplore-relatedArtworks"
                ]
              },
              "8xplour": {
                "files": {},
                "column": {
                  "fileIds": [],
                  "id": "8xplour-relatedArtworks"
                },
                "columnOrder": [
                  "8xplour-relatedArtworks"
                ]
              },
              "Cherry": {
                "files": {},
                "column": {
                  "fileIds": [],
                  "id": "Cherry-relatedArtworks"
                },
                "columnOrder": [
                  "Cherry-relatedArtworks"
                ]
              }
            },
            "relatedArtworkDUMMY": {
              "201910030953812_BGFC2LL5.jpg": {
                "artworkFamily": null,
                "displayMain": null,
                "themes": [],
                "seeAlso": [],
                "location": null,
                "year": null,
                "_id": "5dcecac32ac31c16c490ea59",
                "category": {
                  "medium": {
                    "graphics": [],
                    "photo": []
                  }
                },
                "filePath": "/uploads/201910030953812_BGFC2LL5.jpg",
                "fileName": "201910030953812_BGFC2LL5.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": null,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_article-hero_pc_920x518.jpg": {
                "artworkFamily": "note10",
                "displayMain": null,
                "themes": [
                  "Zamzung",
                  "social",
                  "selfie",
                  "note10"
                ],
                "seeAlso": [
                  "im0049_explore_social-media-videos_feature-item1_mo_720x680.jpg",
                  "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg",
                  "im0049_explore_social-media-videos_feature-item3_pc_330x440.jpg"
                ],
                "location": null,
                "year": null,
                "_id": "5dc956d3cf0c7e5c841ec175",
                "category": {
                  "medium": {
                    "graphics": [
                      "cg"
                    ]
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_article-hero_pc_920x518.jpg",
                "fileName": "im0049_explore_social-media-videos_article-hero_pc_920x518.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 0,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_content-embed1_mo_720x405.jpg": {
                "artworkFamily": "8xplour",
                "displayMain": null,
                "themes": [
                  "crescent"
                ],
                "seeAlso": [
                  "im0049_explore_social-media-videos_content-embed4_mo_720x405.jpg",
                  "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg"
                ],
                "location": null,
                "year": null,
                "_id": "5dc59e8dae2633255c80c0a0",
                "category": {
                  "medium": {
                    "graphics": [
                      "print material"
                    ]
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_content-embed1_mo_720x405.jpg",
                "fileName": "im0049_explore_social-media-videos_content-embed1_mo_720x405.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 0,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_content-embed2_mo_720x405.jpg": {
                "artworkFamily": "EXPLORE",
                "displayMain": null,
                "themes": [
                  "Kamil",
                  "crescent"
                ],
                "seeAlso": [
                  "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                  "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg",
                  "im0049_explore_social-media-videos_content-embed4_mo_720x405.jpg",
                  "im0049_explore_social-media-videos_content-embed1_mo_720x405.jpg"
                ],
                "location": null,
                "year": null,
                "_id": "5dc9544be639c226c8f7657c",
                "category": {
                  "public": {}
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_content-embed2_mo_720x405.jpg",
                "fileName": "im0049_explore_social-media-videos_content-embed2_mo_720x405.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 1,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_content-embed4_mo_720x405.jpg": {
                "artworkFamily": "EXPLORE",
                "displayMain": null,
                "themes": [
                  "Kamil",
                  "crescent"
                ],
                "seeAlso": [
                  "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                  "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg"
                ],
                "location": "",
                "year": "",
                "_id": "5dc59c4d2456105b34cecff1",
                "category": {
                  "medium": {
                    "graphics": []
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_content-embed4_mo_720x405.jpg",
                "fileName": "im0049_explore_social-media-videos_content-embed4_mo_720x405.jpg",
                "fileType": "image/jpeg",
                "familyDescription": "",
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 3,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg": {
                "artworkFamily": "3ksplore",
                "displayMain": null,
                "themes": [],
                "seeAlso": [],
                "location": null,
                "year": null,
                "_id": "5dc59d7a2456105b34cecff4",
                "category": {
                  "studio": {
                    "wip": [
                      "progress"
                    ]
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                "fileName": "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 0,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_content-embed6_pc_920x518.jpg": {
                "artworkFamily": "EXPLORE",
                "displayMain": null,
                "themes": [
                  "Kamil",
                  "crescent"
                ],
                "seeAlso": [
                  "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                  "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg"
                ],
                "location": null,
                "year": null,
                "_id": "5dc95478e639c226c8f7657e",
                "category": {
                  "medium": {
                    "graphics": []
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_content-embed6_pc_920x518.jpg",
                "fileName": "im0049_explore_social-media-videos_content-embed6_pc_920x518.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 3,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg": {
                "artworkFamily": "note10",
                "displayMain": null,
                "themes": [
                  "Zamzung",
                  "social",
                  "selfie",
                  "note10"
                ],
                "seeAlso": [],
                "location": "",
                "year": "",
                "_id": "5dc58b3232c7244c586efe0b",
                "category": {
                  "medium": {
                    "graphics": [
                      "cg"
                    ]
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg",
                "fileName": "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg",
                "fileType": "image/jpeg",
                "familyDescription": "",
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 0,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_feature-item1_mo_720x680.jpg": {
                "artworkFamily": "note10",
                "displayMain": null,
                "themes": [
                  "Zamzung",
                  "social",
                  "selfie",
                  "note10"
                ],
                "seeAlso": [],
                "location": null,
                "year": null,
                "_id": "5dc59a86373fb5607084df42",
                "category": {
                  "medium": {
                    "graphics": [
                      "cg"
                    ]
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_feature-item1_mo_720x680.jpg",
                "fileName": "im0049_explore_social-media-videos_feature-item1_mo_720x680.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 1,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_feature-item2_mo_720x680.jpg": {
                "artworkFamily": "note10",
                "displayMain": null,
                "themes": [
                  "Zamzung",
                  "social",
                  "selfie",
                  "note10"
                ],
                "seeAlso": [],
                "location": null,
                "year": null,
                "_id": "5dc59a86373fb5607084df43",
                "category": {
                  "medium": {
                    "graphics": [
                      "cg"
                    ]
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_feature-item2_mo_720x680.jpg",
                "fileName": "im0049_explore_social-media-videos_feature-item2_mo_720x680.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 2,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_feature-item3_pc_330x440.jpg": {
                "artworkFamily": "EXPLORE",
                "displayMain": null,
                "themes": [
                  "Kamil",
                  "crescent"
                ],
                "seeAlso": [
                  "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                  "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg"
                ],
                "location": null,
                "year": null,
                "_id": "5dc95660db47da39b0040c67",
                "category": {
                  "medium": {
                    "sculpture": []
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_feature-item3_pc_330x440.jpg",
                "fileName": "im0049_explore_social-media-videos_feature-item3_pc_330x440.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 0,
                "__v": 0,
                "useFamilySetup": false
              },
              "lt-galaxy-buds-r170-sm-r170nzkaseb-frontblack-146371849.png": {
                "artworkFamily": "note10",
                "displayMain": null,
                "themes": [
                  "Zamzung",
                  "social",
                  "selfie",
                  "note10"
                ],
                "seeAlso": [],
                "location": null,
                "year": null,
                "_id": "5dc95703cf0c7e5c841ec177",
                "category": {
                  "medium": {
                    "graphics": [
                      "cg"
                    ]
                  }
                },
                "filePath": "/uploads/lt-galaxy-buds-r170-sm-r170nzkaseb-frontblack-146371849.png",
                "fileName": "lt-galaxy-buds-r170-sm-r170nzkaseb-frontblack-146371849.png",
                "fileType": "image/png",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 3,
                "__v": 0,
                "useFamilySetup": false
              }
            },
            "categoriesDUMMY": [
              {
                "_id": {
                  "$oid": "5d8915c01882d3254014395c"
                },
                "category": "medium",
                "subcategory": {
                  "graphics": [
                    "print material",
                    "drawing",
                    "cg"
                  ],
                  "photo": [
                    "nude",
                    "color",
                    "b/w"
                  ],
                  "painting": [],
                  "sculpture": [
                    "installation"
                  ]
                },
                "__v": {
                  "$numberInt": "0"
                }
              },
              {
                "_id": {
                  "$oid": "5d89165a1882d3254014395d"
                },
                "category": "public",
                "subcategory": {
                  "other": [],
                  "exhibitions": [
                    "malonioji",
                    "kkkc",
                    "gotta do"
                  ]
                },
                "__v": {
                  "$numberInt": "0"
                }
              },
              {
                "_id": {
                  "$oid": "5d89f971ca805850a4d9692a"
                },
                "category": "studio",
                "subcategory": {
                  "wip": [
                    "sketches",
                    "progress"
                  ],
                  "studio": [],
                  "misc": []
                },
                "__v": {
                  "$numberInt": "0"
                }
              }
            ],
            "showModal": false,
            "artworkInfoData": {
              "201910030953812_BGFC2LL5.jpg": {
                "artworkFamily": null,
                "displayMain": null,
                "themes": [],
                "seeAlso": [],
                "location": null,
                "year": null,
                "_id": "5dcecac32ac31c16c490ea59",
                "category": {
                  "medium": {
                    "graphics": [],
                    "photo": []
                  }
                },
                "filePath": "/uploads/201910030953812_BGFC2LL5.jpg",
                "fileName": "201910030953812_BGFC2LL5.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": null,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_article-hero_pc_920x518.jpg": {
                "artworkFamily": "note10",
                "displayMain": null,
                "themes": [
                  "Zamzung",
                  "social",
                  "selfie",
                  "note10"
                ],
                "seeAlso": [
                  "im0049_explore_social-media-videos_feature-item1_mo_720x680.jpg",
                  "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg",
                  "im0049_explore_social-media-videos_feature-item3_pc_330x440.jpg"
                ],
                "location": null,
                "year": null,
                "_id": "5dc956d3cf0c7e5c841ec175",
                "category": {
                  "medium": {
                    "graphics": [
                      "cg"
                    ]
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_article-hero_pc_920x518.jpg",
                "fileName": "im0049_explore_social-media-videos_article-hero_pc_920x518.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 4,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_content-embed1_mo_720x405.jpg": {
                "artworkFamily": "EXPLORE",
                "displayMain": null,
                "themes": [
                  "Kamil",
                  "crescent"
                ],
                "seeAlso": [
                  "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                  "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg"
                ],
                "location": "",
                "year": "",
                "_id": "5dc59e6bae2633255c80c09e",
                "category": {
                  "medium": {
                    "photo": [
                      "color"
                    ]
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_content-embed1_mo_720x405.jpg",
                "fileName": "im0049_explore_social-media-videos_content-embed1_mo_720x405.jpg",
                "fileType": "image/jpeg",
                "familyDescription": "",
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 1,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_content-embed2_mo_720x405.jpg": {
                "artworkFamily": "EXPLORE",
                "displayMain": null,
                "themes": [
                  "Kamil",
                  "crescent"
                ],
                "seeAlso": [
                  "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                  "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg",
                  "im0049_explore_social-media-videos_content-embed4_mo_720x405.jpg",
                  "im0049_explore_social-media-videos_content-embed1_mo_720x405.jpg"
                ],
                "location": null,
                "year": null,
                "_id": "5dc9544be639c226c8f7657c",
                "category": {
                  "public": {}
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_content-embed2_mo_720x405.jpg",
                "fileName": "im0049_explore_social-media-videos_content-embed2_mo_720x405.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 2,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_content-embed4_mo_720x405.jpg": {
                "artworkFamily": "EXPLORE",
                "displayMain": null,
                "themes": [
                  "Kamil",
                  "crescent"
                ],
                "seeAlso": [
                  "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                  "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg"
                ],
                "location": "",
                "year": "",
                "_id": "5dc59c4d2456105b34cecff1",
                "category": {
                  "medium": {
                    "graphics": []
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_content-embed4_mo_720x405.jpg",
                "fileName": "im0049_explore_social-media-videos_content-embed4_mo_720x405.jpg",
                "fileType": "image/jpeg",
                "familyDescription": "",
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 0,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg": {
                "artworkFamily": "3ksplore",
                "displayMain": null,
                "themes": [],
                "seeAlso": [],
                "location": null,
                "year": null,
                "_id": "5dc59d7a2456105b34cecff4",
                "category": {
                  "studio": {
                    "wip": [
                      "progress"
                    ]
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                "fileName": "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 0,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_content-embed6_pc_920x518.jpg": {
                "artworkFamily": "EXPLORE",
                "displayMain": null,
                "themes": [
                  "Kamil",
                  "crescent"
                ],
                "seeAlso": [
                  "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                  "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg"
                ],
                "location": null,
                "year": null,
                "_id": "5dc95478e639c226c8f7657e",
                "category": {
                  "medium": {
                    "graphics": []
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_content-embed6_pc_920x518.jpg",
                "fileName": "im0049_explore_social-media-videos_content-embed6_pc_920x518.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 3,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg": {
                "artworkFamily": "note10",
                "displayMain": null,
                "themes": [
                  "Zamzung",
                  "social",
                  "selfie",
                  "note10"
                ],
                "seeAlso": [],
                "location": "",
                "year": "",
                "_id": "5dc58b3232c7244c586efe0b",
                "category": {
                  "medium": {
                    "graphics": [
                      "cg"
                    ]
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg",
                "fileName": "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg",
                "fileType": "image/jpeg",
                "familyDescription": "",
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 1,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_feature-item1_mo_720x680.jpg": {
                "artworkFamily": "note10",
                "displayMain": null,
                "themes": [
                  "Zamzung",
                  "social",
                  "selfie",
                  "note10"
                ],
                "seeAlso": [],
                "location": null,
                "year": null,
                "_id": "5dc59a86373fb5607084df42",
                "category": {
                  "medium": {
                    "graphics": [
                      "cg"
                    ]
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_feature-item1_mo_720x680.jpg",
                "fileName": "im0049_explore_social-media-videos_feature-item1_mo_720x680.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 3,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_feature-item2_mo_720x680.jpg": {
                "artworkFamily": "note10",
                "displayMain": null,
                "themes": [
                  "Zamzung",
                  "social",
                  "selfie",
                  "note10"
                ],
                "seeAlso": [],
                "location": null,
                "year": null,
                "_id": "5dc59a83373fb5607084df41",
                "category": {
                  "medium": {
                    "graphics": [
                      "cg"
                    ]
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_feature-item2_mo_720x680.jpg",
                "fileName": "im0049_explore_social-media-videos_feature-item2_mo_720x680.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 2,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_feature-item3_pc_330x440.jpg": {
                "artworkFamily": "EXPLORE",
                "displayMain": null,
                "themes": [
                  "Kamil",
                  "crescent"
                ],
                "seeAlso": [
                  "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                  "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg"
                ],
                "location": null,
                "year": null,
                "_id": "5dc9565ddb47da39b0040c64",
                "category": {
                  "medium": {
                    "sculpture": []
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_feature-item3_pc_330x440.jpg",
                "fileName": "im0049_explore_social-media-videos_feature-item3_pc_330x440.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 4,
                "__v": 0,
                "useFamilySetup": false
              },
              "lt-galaxy-buds-r170-sm-r170nzkaseb-frontblack-146371849.png": {
                "artworkFamily": "note10",
                "displayMain": null,
                "themes": [
                  "Zamzung",
                  "social",
                  "selfie",
                  "note10"
                ],
                "seeAlso": [],
                "location": null,
                "year": null,
                "_id": "5dc95703cf0c7e5c841ec176",
                "category": {
                  "medium": {
                    "graphics": [
                      "cg"
                    ]
                  }
                },
                "filePath": "/uploads/lt-galaxy-buds-r170-sm-r170nzkaseb-frontblack-146371849.png",
                "fileName": "lt-galaxy-buds-r170-sm-r170nzkaseb-frontblack-146371849.png",
                "fileType": "image/png",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 0,
                "__v": 0,
                "useFamilySetup": false
              }
            },
            "artworkOnDisplay": {
              "201910030953812_BGFC2LL5.jpg": {
                "artworkFamily": null,
                "displayMain": null,
                "themes": [],
                "seeAlso": [],
                "location": null,
                "year": null,
                "_id": "5dcecac32ac31c16c490ea59",
                "category": {
                  "medium": {
                    "graphics": [],
                    "photo": []
                  }
                },
                "filePath": "/uploads/201910030953812_BGFC2LL5.jpg",
                "fileName": "201910030953812_BGFC2LL5.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": null,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_article-hero_pc_920x518.jpg": {
                "artworkFamily": "note10",
                "displayMain": null,
                "themes": [
                  "Zamzung",
                  "social",
                  "selfie",
                  "note10"
                ],
                "seeAlso": [
                  "im0049_explore_social-media-videos_feature-item1_mo_720x680.jpg",
                  "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg",
                  "im0049_explore_social-media-videos_feature-item3_pc_330x440.jpg"
                ],
                "location": null,
                "year": null,
                "_id": "5dc956d3cf0c7e5c841ec175",
                "category": {
                  "medium": {
                    "graphics": [
                      "cg"
                    ]
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_article-hero_pc_920x518.jpg",
                "fileName": "im0049_explore_social-media-videos_article-hero_pc_920x518.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 4,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_content-embed1_mo_720x405.jpg": {
                "artworkFamily": "EXPLORE",
                "displayMain": null,
                "themes": [
                  "Kamil",
                  "crescent"
                ],
                "seeAlso": [
                  "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                  "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg"
                ],
                "location": "",
                "year": "",
                "_id": "5dc59e6bae2633255c80c09e",
                "category": {
                  "medium": {
                    "photo": [
                      "color"
                    ]
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_content-embed1_mo_720x405.jpg",
                "fileName": "im0049_explore_social-media-videos_content-embed1_mo_720x405.jpg",
                "fileType": "image/jpeg",
                "familyDescription": "",
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 1,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_content-embed2_mo_720x405.jpg": {
                "artworkFamily": "EXPLORE",
                "displayMain": null,
                "themes": [
                  "Kamil",
                  "crescent"
                ],
                "seeAlso": [
                  "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                  "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg",
                  "im0049_explore_social-media-videos_content-embed4_mo_720x405.jpg",
                  "im0049_explore_social-media-videos_content-embed1_mo_720x405.jpg"
                ],
                "location": null,
                "year": null,
                "_id": "5dc9544be639c226c8f7657c",
                "category": {
                  "public": {}
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_content-embed2_mo_720x405.jpg",
                "fileName": "im0049_explore_social-media-videos_content-embed2_mo_720x405.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 2,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_content-embed4_mo_720x405.jpg": {
                "artworkFamily": "EXPLORE",
                "displayMain": null,
                "themes": [
                  "Kamil",
                  "crescent"
                ],
                "seeAlso": [
                  "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                  "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg"
                ],
                "location": "",
                "year": "",
                "_id": "5dc59c4d2456105b34cecff1",
                "category": {
                  "medium": {
                    "graphics": []
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_content-embed4_mo_720x405.jpg",
                "fileName": "im0049_explore_social-media-videos_content-embed4_mo_720x405.jpg",
                "fileType": "image/jpeg",
                "familyDescription": "",
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 0,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg": {
                "artworkFamily": "3ksplore",
                "displayMain": null,
                "themes": [],
                "seeAlso": [],
                "location": null,
                "year": null,
                "_id": "5dc59d7a2456105b34cecff4",
                "category": {
                  "studio": {
                    "wip": [
                      "progress"
                    ]
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                "fileName": "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 0,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_content-embed6_pc_920x518.jpg": {
                "artworkFamily": "EXPLORE",
                "displayMain": null,
                "themes": [
                  "Kamil",
                  "crescent"
                ],
                "seeAlso": [
                  "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                  "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg"
                ],
                "location": null,
                "year": null,
                "_id": "5dc95478e639c226c8f7657e",
                "category": {
                  "medium": {
                    "graphics": []
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_content-embed6_pc_920x518.jpg",
                "fileName": "im0049_explore_social-media-videos_content-embed6_pc_920x518.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 3,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg": {
                "artworkFamily": "note10",
                "displayMain": null,
                "themes": [
                  "Zamzung",
                  "social",
                  "selfie",
                  "note10"
                ],
                "seeAlso": [],
                "location": "",
                "year": "",
                "_id": "5dc58b3232c7244c586efe0b",
                "category": {
                  "medium": {
                    "graphics": [
                      "cg"
                    ]
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg",
                "fileName": "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg",
                "fileType": "image/jpeg",
                "familyDescription": "",
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 1,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_feature-item1_mo_720x680.jpg": {
                "artworkFamily": "note10",
                "displayMain": null,
                "themes": [
                  "Zamzung",
                  "social",
                  "selfie",
                  "note10"
                ],
                "seeAlso": [],
                "location": null,
                "year": null,
                "_id": "5dc59a86373fb5607084df42",
                "category": {
                  "medium": {
                    "graphics": [
                      "cg"
                    ]
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_feature-item1_mo_720x680.jpg",
                "fileName": "im0049_explore_social-media-videos_feature-item1_mo_720x680.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 3,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_feature-item2_mo_720x680.jpg": {
                "artworkFamily": "note10",
                "displayMain": null,
                "themes": [
                  "Zamzung",
                  "social",
                  "selfie",
                  "note10"
                ],
                "seeAlso": [],
                "location": null,
                "year": null,
                "_id": "5dc59a83373fb5607084df41",
                "category": {
                  "medium": {
                    "graphics": [
                      "cg"
                    ]
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_feature-item2_mo_720x680.jpg",
                "fileName": "im0049_explore_social-media-videos_feature-item2_mo_720x680.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 2,
                "__v": 0,
                "useFamilySetup": false
              },
              "im0049_explore_social-media-videos_feature-item3_pc_330x440.jpg": {
                "artworkFamily": "EXPLORE",
                "displayMain": null,
                "themes": [
                  "Kamil",
                  "crescent"
                ],
                "seeAlso": [
                  "im0049_explore_social-media-videos_content-embed5_mo_720x405.jpg",
                  "im0049_explore_social-media-videos_content-tip-item1_mo_408x538.jpg"
                ],
                "location": null,
                "year": null,
                "_id": "5dc9565ddb47da39b0040c64",
                "category": {
                  "medium": {
                    "sculpture": []
                  }
                },
                "filePath": "/uploads/im0049_explore_social-media-videos_feature-item3_pc_330x440.jpg",
                "fileName": "im0049_explore_social-media-videos_feature-item3_pc_330x440.jpg",
                "fileType": "image/jpeg",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 4,
                "__v": 0,
                "useFamilySetup": false
              },
              "lt-galaxy-buds-r170-sm-r170nzkaseb-frontblack-146371849.png": {
                "artworkFamily": "note10",
                "displayMain": null,
                "themes": [
                  "Zamzung",
                  "social",
                  "selfie",
                  "note10"
                ],
                "seeAlso": [],
                "location": null,
                "year": null,
                "_id": "5dc95703cf0c7e5c841ec176",
                "category": {
                  "medium": {
                    "graphics": [
                      "cg"
                    ]
                  }
                },
                "filePath": "/uploads/lt-galaxy-buds-r170-sm-r170nzkaseb-frontblack-146371849.png",
                "fileName": "lt-galaxy-buds-r170-sm-r170nzkaseb-frontblack-146371849.png",
                "fileType": "image/png",
                "familyDescription": null,
                "artworkTitle": null,
                "artworkDescription": null,
                "familyDisplayIndex": 0,
                "__v": 0,
                "useFamilySetup": false
              }
            },
            "themesData": [
              "acephale",
              "tools",
              "selfie",
              "staircase",
              "social",
              "crescent",
              "connected spheres",
              "fruit",
              "dream",
              "eat",
              "ghost",
              "ashtray",
              "celestial",
              "celestial body",
              "cloud",
              "days",
              "frame",
              "furniture",
              "lights",
              "kiss",
              "coldbath",
              "sculpture",
              "audio",
              "restaurant",
              "fountain",
              "stage",
              "support",
              "Kamil",
              "test",
              "test2",
              "dadada",
              "samsong",
              "Zamzung",
              "lol",
              "note10"
            ],
            "artworkFamilyList": [
              "freshOne",
              "NEw_version02",
              "family_desc",
              "gradient_acephale",
              "with description",
              "dadadada",
              "without info",
              "withoutCategory",
              "EMPTY CATEGORY",
              "emtyyyyy",
              "note10",
              "explore",
              "EXPLORE",
              "3ksplore",
              "8xplour",
              "Cherry"
            ],
            "categoriesData": [
              {
                "_id": "5d8915c01882d3254014395c",
                "category": "medium",
                "subcategory": {
                  "graphics": [
                    "print material",
                    "drawing",
                    "cg"
                  ],
                  "photo": [
                    "nude",
                    "color",
                    "b/w"
                  ],
                  "painting": [],
                  "sculpture": [
                    "installation"
                  ]
                },
                "__v": 0
              },
              {
                "_id": "5d89165a1882d3254014395d",
                "category": "public",
                "subcategory": {
                  "other": [],
                  "exhibitions": [
                    "malonioji",
                    "kkkc",
                    "gotta do"
                  ]
                },
                "__v": 0
              },
              {
                "_id": "5d89f971ca805850a4d9692a",
                "category": "studio",
                "subcategory": {
                  "wip": [
                    "sketches",
                    "progress"
                  ],
                  "studio": [],
                  "misc": []
                },
                "__v": 0
              }
            ],
            "categoriesOptionList": {
              "data": {
                "medium": [
                  "graphics",
                  "photo",
                  "painting",
                  "sculpture"
                ],
                "public": [
                  "other",
                  "exhibitions"
                ],
                "studio": [
                  "wip",
                  "studio",
                  "misc"
                ]
              }
            }
          }
    }

    //creates an array of all files in the server uploads folder
    this.readImageDir = () => {
        axios.get('/fetchImages')
        .then(res => 
            {return res}
            // this.setState({serverFileDir: res.data})
            )
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

    this.getArtworkInfo = () => {
        return new Promise((resolve, rej) => {

            let serverFileNames = null;
            
            //get an array of all file names in the server
            axios.get('/fetchImages')
                .then(res => {
                    serverFileNames = res.data
    
                    //get all artwork records from database
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
                })   
        })
    }

    this.categoryChecked = (category) => {
        let onDisplay = false
        Object.keys(this.state.artworkOnDisplay).forEach(fileName => {
            const file = this.state.artworkOnDisplay[fileName]
            if(Object.keys(file.category).includes(category)){
                onDisplay = true
            }
        })
        return onDisplay
    }

    this.filterByCategory = (e, category) => {
        let newDisplay = {}
        let zeroDisplay = {}

        //ON UN-CHECK
        if(!e.target.checked){
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
            return this.setState({artworkOnDisplay: newDisplay})
        }
        //ON CHECK
        else{
            newDisplay={...this.state.artworkOnDisplay}
            Object.keys(this.state.visibleArtwork).forEach(fileName => {
                const file = this.state.visibleArtwork[fileName]
                if(Object.keys(file.category).includes(category)){
                    newDisplay = {...newDisplay, [fileName]: file}
                }
            })
            Object.keys(newDisplay).forEach(id => {
                document.getElementById(id).classList.remove('image-hide')
            })
            return this.setState({artworkOnDisplay: newDisplay})
        }

    }
    this.filterBySubcategory = (e, category, subcategory) => {
        let newDisplay = {}
        let zeroDisplay = {}

        //ON UN-CHECK
        if(!e.target.checked){
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
            return this.setState({artworkOnDisplay: newDisplay})
        }
        //ON CHECK
        else{
            newDisplay={...this.state.artworkOnDisplay}
            Object.keys(this.state.visibleArtwork).forEach(fileName => {
                const file = this.state.visibleArtwork[fileName]
                if(file.category[category]){
                    if(Object.keys(file.category[category]).includes(subcategory)){
                        newDisplay = {...newDisplay, [fileName]: file}
                    }
                }
            })
            Object.keys(newDisplay).forEach(id => {
                document.getElementById(id).classList.remove('image-hide')
            })
            return this.setState({artworkOnDisplay: newDisplay})
        }

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
    this.filterByListitem = (e, category, subcategory, listitem) => {
      let newDisplay = {}
      let zeroDisplay = {}

      //ON UN-CHECK
      if(!e.target.checked){
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
          return this.setState({artworkOnDisplay: newDisplay})
      }
      //ON CHECK
      else{
          newDisplay={...this.state.artworkOnDisplay}
          Object.keys(this.state.visibleArtwork).forEach(fileName => {
              const file = this.state.visibleArtwork[fileName]
              if(file.category[category]){
                if(file.category[category][subcategory]){
                  if(file.category[category][subcategory].includes(listitem)){
                    newDisplay = {...newDisplay, [fileName]: file}
                  }
                }
              }
          })
          Object.keys(newDisplay).forEach(id => {
              document.getElementById(id).classList.remove('image-hide')
          })
          return this.setState({artworkOnDisplay: newDisplay})
      }

  }

    this.shrinkImageSelect = () => {

        const imageSelect = document.getElementById('imageSelect')
        imageSelect.style.width = "70%"
        setTimeout(() => {
            imageSelect.style.width = "35%"
        }, 100);
        setTimeout(() => {
            imageSelect.style.width = "150px"
        }, 200);
        setTimeout(() => {
          Array.from(document.getElementsByClassName("ImagesPreview--imageContainer")).forEach(preview => {
            preview.classList.add("low-opacity")
          })
        }, 300);
    }
    this.extendImageSelect = () => {
      Array.from(document.getElementsByClassName("ImagesPreview--imageContainer")).forEach(preview => {
        preview.classList.remove("low-opacity")
      })
        const imageSelect = document.getElementById('imageSelect')
        imageSelect.style.width = "25%"
        setTimeout(() => {
            imageSelect.style.width = "50%"
        }, 100);
        setTimeout(() => {
            imageSelect.style.width = "100%"
        }, 200);
    }

    this.enlarge = (id) => {
        console.log('ENLARGE RUNS')
            const file = this.state.artworkOnDisplay[id]
            const imageSelect = document.getElementById('imageSelect')
            if(!this.state.enlarge){

              let enlarge = {}
              enlarge.foreground = file
              enlarge.background = file

              this.setState({enlarge}, () => {
                  if(!imageSelect.classList.contains('minimized')){
                      imageSelect.classList.add('minimized')
                      this.shrinkImageSelect()
                  }
                  document.getElementById('enlargeContainer').style.zIndex = "-1"
                  // document.getElementById('enlargeContainer').style.transform = "translateX(0)"
                  document.getElementById('enlargeContainer').style.zIndex = 0
              })
            }
            else{
              const file = this.state.artworkOnDisplay[id]
              const foreground = document.getElementById('foreground')
              // foreground.style.opacity = 1

              let enlarge = this.state.enlarge
              enlarge.background = file
              this.setState({enlarge}, () => {
                foreground.style.opacity = 0
                setTimeout(() => {
                  enlarge.foreground = file
                  this.setState(enlarge, () => {
                    foreground.style.opacity = 1
                  })
                }, 400);
                // if(!imageSelect.classList.contains('minimized')){
                //     imageSelect.classList.add('minimized')
                //     this.shrinkImageSelect()
                // }
                // document.getElementById('enlargeContainer').style.zIndex = "-1"
                // document.getElementById('enlargeContainer').style.transform = "translateX(0)"
                // document.getElementById('enlargeContainer').style.zIndex = 0
            })

            }
    }

    this.hideArtworkInfo = (e) => {
      if(e){
        e.stopPropagation()
      }
      if(document.getElementById('ArtworkInfo') && document.getElementById('ArtworkInfo').classList.contains("info-up")){
        document.getElementById('ArtworkInfo').classList.remove('info-up')
        return 200
      }
      else { return 1}
    }
 
    this.closeEnlarge = (e) => {
      e.stopPropagation()
        if(document.getElementsByClassName("info-up").length > 0){
          document.getElementsByClassName("info-up")[0].classList.remove("info-up")
          return
        }
        const delay = this.hideArtworkInfo()
        setTimeout(() => {      
          const enlargeContainer = document.getElementById('enlargeContainer')
          const imagesWidth = document.getElementById('images').clientWidth
          enlargeContainer.style.transform = `translateX(100%)`
          document.getElementById('imageSelect').style.width = `${imagesWidth}px`
  
          const enlarge = {...this.state.enlarge}
          enlarge.open = false
          this.setState({enlarge})
        }, delay);
    }

    this.viewNext = () => {
          const familyName = this.state.enlarge.foreground.artworkFamily
          if(!familyName){
              return
          }
          // let currentIndex = this.state.relatedArtwork[familyName].column.fileIds.indexOf
          let currentIndex = this.state.enlarge.foreground.familyDisplayIndex
          // if(!currentIndex || currentIndex < 0){
          //   currentIndex = 0
          //   let newEnlarge = {...this.state.enlarge}
          //   newEnlarge.backupIndex
          //   this.setState.enlarge.backupIndex
          // }
          const familyLength = this.state.relatedArtwork[familyName].column.fileIds.length
          let nextIndex = currentIndex +1 > familyLength -1 ? 0 : currentIndex+1
          const nextPicName = this.state.relatedArtwork[familyName].column.fileIds[nextIndex]
          const nextPic = this.state.artworkInfoData[nextPicName]
          if(!nextPic){
              return
          }
          this.animateEnlarge(nextPic)
    }

    this.countWidth = (containerHeight, naturalHeight, naturalWidth) => {
      const maxWidth = document.getElementById("images").clientWidth - 120
      const sizeRatio = naturalHeight / containerHeight
      const naturalRation = naturalWidth / naturalHeight

      let futureWidth = Math.round(naturalWidth / sizeRatio)
      let futureHeight = Math.round(futureWidth / naturalRation)

      if(futureWidth > maxWidth){
        futureWidth = maxWidth
        futureHeight = Math.round(maxWidth / naturalRation)
      }

      futureHeight = futureHeight > containerHeight ? containerHeight : futureHeight

      return {width: futureWidth, height: futureHeight}
    }

    this.animateEnlarge = (file) => {
      
      // this.hideArtworkInfo()
      const background = document.getElementById("background") 
      const foreground = document.getElementById("foreground") 
      const container = document.getElementById("enlargeContainer") 
      const imageSelect = document.getElementById("imageSelect")
      const images = document.getElementById("images")

      let enlarge = this.state.enlarge ? {...this.state.enlarge} : {}
      enlarge.previous = !enlarge.background ? file : enlarge.background
      enlarge.background = file

      function backgroundImage(tries, willFail) {
        return new Promise((resolve, reject) => {
          
          if (--tries > 0) {
            setTimeout(function() {
              if(document.getElementById(file.fileName)){
                resolve(document.getElementById(file.fileName))
              }
            }, 1);
          } 
          else {
            if (willFail) {
              reject('Failure');
            } else {
              if(document.getElementById(file.fileName)){
                resolve(document.getElementById(file.fileName))
              }
            }
          }
        });
      }
        
      this.setState({enlarge}, () => {

        backgroundImage(5, true)
          .then(res => {
              
              const futureSize = this.countWidth(container.clientHeight, file.naturalSize.naturalHeight, file.naturalSize.naturalWidth)
              
              console.log("enlarge.naturalSize")
              console.log(enlarge.background.naturalSize)

              console.log("file naturalSize")
              console.log(file.naturalSize)
              
      
              // imageSelect.style.width = `${images.clientWidth - futureSize.width}px`
              
              if(this.state.enlarge){
                //if enlargeContainer will shrink
                if(this.state.enlarge.currentWidth && this.state.enlarge.currentWidth > futureSize.width && this.state.enlarge.open){
                  imageSelect.style.width = `${images.clientWidth - futureSize.width}px`
                }
                else{
                  // imageSelect.style.transition = "0.4s all"
                  setTimeout(() => {
                    imageSelect.style.width = `${images.clientWidth - futureSize.width}px`
                  }, 410);
                }
              }
              else{
                // imageSelect.style.transition = "0.4s all"
                setTimeout(() => {
                  imageSelect.style.width = `${images.clientWidth - futureSize.width}px`
                }, 410);
              }

      
              // container.style.transform = `scaleX(${futureSize.width})`
              // background.style.transform = `scaleY(${futureSize.height})`
              // foreground.style.transform = `scaleY(${futureSize.height})`

              background.style.height = `${futureSize.height}px`
              foreground.style.height = `${futureSize.height}px`
              container.style.width = `${futureSize.width}px`

              // background.style.opacity = 1

              foreground.style.opacity = 0
      
              
              if(!this.state.enlarge || !this.state.enlarge.open){
                // container.style.transform = 'translateX(0)'
                container.style.transform = 'translateX(0)'
              }
      
              setTimeout(() => {
                let newState = {...this.state}
                newState.enlarge.foreground = file
                newState.enlarge.currentWidth = futureSize.width
                newState.enlarge.open = true
                this.setState(newState, () => {

                  // foreground.classList.remove("foreground-transition")
                  // background.classList.remove("foreground-transition")
                  foreground.style.opacity = 1
                  imageSelect.style.transition = "none"
                  // background.style.opacity = 0
                })
              }, 410);
          })
          .catch(err => {
            return backgroundImage(5, true)
          })
    })
  }

    this.loadEnlarge = (e, id) => {
      e.stopPropagation()
        const file = this.state.artworkInfoData[id]
        
        // let enlarge = {...this.state.enlarge}
        // enlarge.background = file

        this.animateEnlarge(file)

        // this.setState({enlarge}, () => {
        //   this.animateEnlarge(file)
        // })
  
  }

    this.viewPrev = () => {
      // const info = document.getElementById("ArtworkInfo")
      // info.classList.remove("info-up")
        const familyName = this.state.enlarge.foreground.artworkFamily
        if(!familyName){
            return
        }
        const currentIndex = this.state.enlarge.foreground.familyDisplayIndex
        const familyLength = this.state.relatedArtwork[familyName].column.fileIds.length
        let nextIndex = currentIndex === 0 ? familyLength -1 : currentIndex -1
        const nextPicName = this.state.relatedArtwork[familyName].column.fileIds[nextIndex]
        const nextPic = this.state.artworkInfoData[nextPicName]
        if(!nextPic){
            return
        }
        this.animateEnlarge(nextPic)
    }

    this.showInfo = () => {
      const info = document.getElementById("ArtworkInfo")
      if(!info.classList.contains('info-up')){
        info.classList.add('info-up')
      }
      else{
        info.classList.remove('info-up')
      }
    }
      /**
       * @param: e
       * @param: theme
       */
    this.filterByTheme = (e, theme) => {
      //ON UN-CHECK
      const newState = {...this.state}
      const toggleArtwork = [...newState.themesOnDisplay[theme]]
      let artworkOnDisplay = {...newState.artworkOnDisplay}

      let visibleThemesList = []
      Object.keys(artworkOnDisplay).forEach(fileName => {
           visibleThemesList = artworkOnDisplay[fileName].themes.map(theme => theme)
        }, () => visibleThemesList = Array.from(new Set(visibleThemesList)))
     

      if(!e.target.checked){
        toggleArtwork.forEach(item => {
          document.getElementById(item).classList.add("image-hide")
        })

        toggleArtwork.forEach(fileName => {
          delete artworkOnDisplay[fileName]
        })

        return this.setState({artworkOnDisplay})
      }

      else{
        this.state.themesOnDisplay[theme].forEach(item => {
          document.getElementById(item).classList.remove("image-hide")
        })

        toggleArtwork.forEach(fileName => {
          artworkOnDisplay = {...artworkOnDisplay, [fileName]: this.state.artworkInfoData[fileName]}
        })

        return this.setState({artworkOnDisplay})
      }
    }

    this.themeChecked = (theme) => {
      let onDisplay = []
      const artworkOnDisplay = {...this.state.artworkOnDisplay}
      onDisplay = Object.keys(artworkOnDisplay).filter(fileName => {
        return artworkOnDisplay[fileName].themes.includes(theme) === true
      })
      return onDisplay.length > 0
    }
}//END OF CONTSTRUCTOR

    componentDidMount(){
        console.log("frontendindex did mount")
            let newState = {...this.state}

            this.setState({showModal: true})

            let Themes = new Promise ((resolve,rej) => {
                axios.get('/api/themes')
                .then( res => {
                newState.themesData = res.data.list
                resolve()
                })
                .catch(err => {
                     
                    // document.location.reload(true)
                })
            })

            let FamilyList = new Promise ((resolve, rej) => {
                axios.get('/api/familySetup')
                .then(res => {
                    let familyList = Object.keys(res.data).map(obj => {
                        return res.data[obj].artworkFamily
                    })
                    newState.artworkFamilyList = familyList
                    resolve()
                })
                .catch(err => {
                     
                    document.location.reload(true)
                })
            })

            let Categories = new Promise ((resolve, rej) => {
                FamilyList.then(res => {
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
            
                            newState.artworkFamilyList.forEach(familyName => {
                                this.getRelatedArtwork(familyName, newState).then(res => 
                                    newState.relatedArtwork[familyName] = res
            
                                )
                            })
                            resolve()
                        })
                        .catch(err => {
                             
                            // document.location.reload(true)
                        })
                })
            }) 

            let ArtworkInfo = new Promise ((resolve, rej) => {
                this.getArtworkInfo()
                    .then(res => {
                        newState.artworkInfoData = res
                        let onDisplay = {}
                        Object.keys(res).forEach(fileName => {
                          if(res[fileName].displayMain){
                            onDisplay = {...onDisplay, [fileName]: res[fileName]}
                          }
                        })
                        
                        let allThemes = []
                        Object.keys(onDisplay).forEach(objName => {
                            allThemes = [...allThemes, ...onDisplay[objName].themes]
                        })
                        let allThemesSet = new Set(allThemes)
                        allThemesSet = Array.from(allThemesSet)

                        let artworkByTheme = {}

                        let arr = Object.keys(onDisplay).map(name => onDisplay[name])

                        allThemesSet.forEach(theme => {
                          arr.forEach(obj => {
                            if(obj.themes.includes(theme)){
                              if(!artworkByTheme[theme]){
                                artworkByTheme[theme] = []
                              }
                              artworkByTheme[theme] = [...artworkByTheme[theme], obj.fileName]
                            }
                          })
                        })
                        newState.artworkOnDisplay = onDisplay
                        newState.visibleArtwork = onDisplay
                        newState.themesOnDisplay = artworkByTheme
                        resolve()
                    })
            })

            let serverFiles = new Promise ((resolve, rej) => {
              axios.get('/fetchimages')
                .then(res => {
                  newState.serverData = res
                  resolve()
                })
            })

            Promise.all([Categories, ArtworkInfo, Themes, serverFiles])
                .then(res => {
                    newState.showModal = false
                    this.setState(newState)
                })
                .catch(err => {
                     
                })
            // let newState = {...this.state}
            // newState.categoriesData = newState.categoriesDUMMY
            // newState.relatedArtwork = newState.relatedArtworkDUMMY
            // newState.artworkInfoData = newState.relatedArtworkDUMMY
            // newState.artworkOnDisplay = newState.relatedArtworkDUMMY
            // this.setState(newState)
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

            filterByTheme: this.filterByTheme,
            themeChecked: this.themeChecked,

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

