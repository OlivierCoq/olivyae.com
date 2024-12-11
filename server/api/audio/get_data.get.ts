export default defineEventHandler((event) => {
  return {
    audio_data: {
      genres: [
        {
          label: 'Electronic',
          value: 'electronic',
          imagery: {
            url: "https://res.cloudinary.com/dffwof1gx/image/upload/v1733704720/Djing_Sound_Engineer_Tuner_llabiw.jpg"
          },
          subgenres: [
            {
              label: 'House',
              value: 'house',
              albums: []
            },
            {
              label: 'Techno',
              value: 'techno',
              albums: []
            },
            {
              label: 'Trance',
              value: 'trance',
              albums: []
            },
            {
              label: 'Drum and Bass',
              value: 'drum_and_bass',
              albums: []
            },
            {
              label: 'Down Tempo',
              value: 'down_tempo',
              albums: []
            }, 
            {
              label: 'Trip Hop',
              value: 'trip_hop',
              albums: []
            },
            {
              label: 'Electro Funk',
              value: 'electro_funk',
              albums: [{
                title: 'Old Tapes',
                cover: {
                  url: "https://res.cloudinary.com/dffwof1gx/image/upload/v1733948085/Old_Tapes_album_cover_pljscq.png"
                },
                tracks: [
                  {
                    id: 1,
                    audio_file: "https://res.cloudinary.com/dffwof1gx/video/upload/v1733948087/Click_las2kd.wav",
                    title: "Click",
                    length: "0:51",
                    genres: [
                      {
                        label: "Electro Funk",
                        value: "electro_funk",
                        active: false
                      },
                      {
                        label:"Electronic",
                        value: "electronic",
                        active: false
                      }
                    ],
                    moods: [
                      {
                        label: "Playful",
                        value: "playful",
                        active: false
                      },
                      {
                        label: "Happy",
                        value: "happy",
                        active: false
                      },
                      {
                        label: "Excited",
                        value: "excited",
                        active: false
                      },
                      {
                        label: "Upbeat",
                        value: "upbeat",
                        active: false
                      }
                    ],
                    vocals: [],
                    instruments: [
                      {
                        label: "Synth",
                        value: "synth",
                        active: false
                      },
                      {
                        label: "Drums",
                        value: "drums",
                        active: false
                      },
                      {
                        label: "Bass",
                        value: "bass",
                        active: false
                      },
                      {
                        label: "Strings",
                        value: "strings",
                        active: false
                      }
                    ]
                  },
                ]
              }]
            },
            {
              label: 'Amapiano',
              value: 'amapiano',
              albums: []
            },
            {
              label: 'Misc',
              value: 'misc',
              albums: [
                {
                  title: 'Butterfly',
                  cover: {
                    url: "https://res.cloudinary.com/dffwof1gx/image/upload/v1733697699/Butterfly_Album_Cover_dxvrll.jpg"
                  },
                  tracks: [

                    {
                      id: 1,
                      audio_file: "https://res.cloudinary.com/dffwof1gx/video/upload/v1733693384/Take_Me_Away_brc7ds.wav",
                      title: "Take Me Away",
                      length: "3:35",
                      genres: [
                        {
                          label: "House",
                          value: "house",
                          active: false
                        },
                        {
                          label: "Drum and Bass",
                          value: "drum_and_bass",
                          active: false
                        }
                      ],
                      moods: [
                        {
                          label: "Pensive",
                          value: "pensive",
                          active: false
                        },
                        {
                          label: "Calm",
                          value: "calm",
                          active: false
                        }
                      ],
                      vocals: [
                        {
                          label: "Female",
                          value: "female",
                          active: false
                        }
                      ],
                      instruments: [
                        {
                          label: "Synth",
                          value: "synth",
                          active: false
                        },
                        {
                          label: "Drums",
                          value: "drums",
                          active: false
                        }
                      ]
                    },

                    {
                      id: 2,
                      audio_file: "https://res.cloudinary.com/dffwof1gx/video/upload/v1733693504/Courage_eyaprw.wav",
                      title: "Courage",
                      length: "3:43",
                      genres: [
                        {
                          label: "House",
                          value: "house",
                          active: false
                        }
                      ],
                      moods: [
                        {
                          label: "Hopeful",
                          value: "hopeful",
                          active: false
                        }
                      ],
                      vocals: [
                        {
                          label: "Female",
                          value: "female",
                          active: false
                        },
                        {
                          label: "Male",
                          value: "male",
                          active: false
                        },
                        {
                          label: "Group",
                          value: "group",
                          active: false
                        }
                      ],
                      instruments: [
                        {
                          label: "Synth",
                          value: "synth",
                          active: false
                        },
                        {
                          label: "Drums",
                          value: "drums",
                          active: false
                        }
                      ]
                    },

                    {
                      id: 3,
                      audio_file: "https://res.cloudinary.com/dffwof1gx/video/upload/v1733693516/Exhaustion_s1diqg.wav",
                      title: "Exhaustion",
                      length: "3:15",
                      genres: [
                        {
                          label: "Drum and Bass",
                          value: "drum_and_bass",
                          active: false
                        }
                      ],
                      moods: [
                        {
                          label: "Sad",
                          value: "sad",
                          active: false
                        },
                        {
                          label: "Pensive",
                          value: "pensive",
                          active: false
                        }
                      ],
                      vocals: [
                        {
                          label: "Female",
                          value: "female",
                          active: false
                        }
                      ],
                      instruments: [
                        {
                          label: "Synth",
                          value: "synth",
                          active: false
                        },
                        {
                          label: "Drums",
                          value: "drums",
                          active: false
                        }
                      ]
                    },

                    {
                      id: 4,
                      audio_file: "https://res.cloudinary.com/dffwof1gx/video/upload/v1733693527/Everything_I_Ever_Wanted_-_Remastered_jelo6y.wav",
                      title: "Everything I Ever Wanted",
                      length: "2:44",
                      genres: [
                        {
                          label: "House",
                          value: "house",
                          active: false
                        }
                      ],
                      moods: [
                        {
                          label: "Excited",
                          value: "excited",
                          active: false
                        }
                      ],
                      vocals: [
                        {
                          label: "Female",
                          value: "female",
                          active: false
                        }
                      ],
                      instruments: [
                        {
                          label: "Synth",
                          value: "synth",
                          active: false
                        },
                        {
                          label: "Drums",
                          value: "drums",
                          active: false
                        }
                      ]
                    },

                    {
                      id: 5,
                      audio_file: "https://res.cloudinary.com/dffwof1gx/video/upload/v1733693536/Watch_me_walk_away_j5cjxq.wav",
                      title: "Watch Me Walk Away",
                      length: "2:54",
                      genres: [
                        {
                          label: "House",
                          value: "house",
                          active: false
                        },
                        {
                          label: "Pop",
                          value: "pop",
                          active: false
                        }
                      ],
                      vocals: [
                        {
                          label: "Female",
                          value: "female",
                          active: false
                        }
                      ],
                      instruments: [
                        {
                          label: "Synth",
                          value: "synth",
                          active: false
                        },
                        {
                          label: "Drums",
                          value: "drums",
                          active: false
                        }
                      ],
                      moods: [
                        {
                          label: "Confident",
                          value: "confident",
                          active: false
                        }
                      ]
                    },

                    {
                      id: 6,
                      audio_file: "https://res.cloudinary.com/dffwof1gx/video/upload/v1733693546/Memories_pfrdwu.wav",
                      title: "Memories",
                      length: "3:12",
                      genres: [
                        {
                          label: "House",
                          value: "house",
                          active: false
                        }
                      ],
                      moods: [
                        {
                          label: "Dreamy",
                          value: "dreamy",
                          active: false
                        }
                      ],
                      vocals: [
                        {
                          label: "Female",
                          value: "female",
                          active: false
                        }
                      ],
                      instruments: [
                        {
                          label: "Synth",
                          value: "synth",
                          active: false
                        },
                        {
                          label: "Drums",
                          value: "drums",
                          active: false
                        }
                      ]
                    },

                    {
                      id: 7,
                      audio_file: "https://res.cloudinary.com/dffwof1gx/video/upload/v1733693558/FOMO_tzc36n.wav",
                      title: "FOMO",
                      length: "5:53",
                      genres: [
                        {
                          label: "House",
                          value: "house",
                          active: false
                        }
                      ],
                      moods: [
                        {
                          label: "Anxious",
                          value: "anxious",
                          active: false
                        },
                        {
                          label: "Dreamy",
                          value: "dreamy",
                          active: false
                        }
                      ],
                      vocals: [
                        {
                          label: "Female",
                          value: "female",
                          active: false
                        }
                      ],
                      instruments: [
                        {
                          label: "Synth",
                          value: "synth",
                          active: false
                        },
                        {
                          label: "Drums",
                          value: "drums",
                          active: false
                        }
                      ]
                    }

                  ]
                }
              ]
            }
          ]
        },
        {
          label: 'Funk',
          imagery: {
            url: "https://res.cloudinary.com/dffwof1gx/image/upload/v1733704766/Funk_x6dwnn.jpg"
          },
          value: 'funk',
          subgenres: [
            {
              label: 'Funk',
              value: 'funk',
              albums: [
                {
                  title: 'Candy',
                  cover: {
                    url: "https://res.cloudinary.com/dffwof1gx/image/upload/v1733887081/Candy_album_cover_eggcfi.jpg"
                  },
                  tracks: [
                    {
                      id: 1,
                      audio_file: "https://res.cloudinary.com/dffwof1gx/video/upload/v1733887181/Jelly_Bean_Groove_lk1nku.wav",
                      title: "Jelly Bean Groove",
                      length: "1:12",
                      genres: [
                        {
                          label: "Funk",
                          value: "funk",
                          active: false
                        },
                      ],
                      moods: [
                        {
                          label: "Playful",
                          value: "playful",
                          active: false
                        },
                         {
                          label: "Happy",
                          value: "happy",
                          active: false
                         },
                         {
                          label: "Excited",
                          value: "excited",
                          active: false
                         },
                         {
                          label: "Upbeat",
                          value: "upbeat",
                          active: false
                         }
                      ],
                      vocals: [
                        {
                          label: "Male",
                          value: "male",
                          active: false
                        }
                      ],
                      instruments: [
                        {
                          label: "Synth",
                          value: "synth",
                          active: false
                        },
                        {
                          label: "Drums",
                          value: "drums",
                          active: false
                        },
                        {
                          label: "Bass",
                          value: "bass",
                          active: false
                        },
                        {
                          label: "Electric Guitar",
                          value: "electric_guitar",
                          active: false
                        }
                      ]
                    },
                    {
                      id: 2,
                      audio_file: "https://res.cloudinary.com/dffwof1gx/video/upload/v1733887181/Jelly_Bean_Groove_-_Instrumental_vxhkdw.wav",
                      title: "Jelly Bean Groove - Instrumental",
                      length: "1:12",
                      genres: [
                        {
                          label: "Funk",
                          value: "funk",
                          active: false
                        },
                      ],
                      moods: [
                        {
                          label: "Playful",
                          value: "playful",
                          active: false
                        },
                         {
                          label: "Happy",
                          value: "happy",
                          active: false
                         },
                         {
                          label: "Excited",
                          value: "excited",
                          active: false
                         },
                         {
                          label: "Upbeat",
                          value: "upbeat",
                          active: false
                         }
                      ],
                      vocals: [
                        {
                          label: "Male",
                          value: "male",
                          active: false
                        }
                      ],
                      instruments: [
                        {
                          label: "Synth",
                          value: "synth",
                          active: false
                        },
                        {
                          label: "Drums",
                          value: "drums",
                          active: false
                        },
                        {
                          label: "Bass",
                          value: "bass",
                          active: false
                        },
                        {
                          label: "Electric Guitar",
                          value: "electric_guitar",
                          active: false
                        }
                      ]
                    },
                                        {
                      id: 3,
                      audio_file: "https://res.cloudinary.com/dffwof1gx/video/upload/v1733949961/Sweet_tooth_qvdrgz.wav",
                      title: "Sweet tooth",
                      length: "1:20",
                      genres: [
                        {
                          label: "Funk",
                          value: "funk",
                          active: false
                        },
                      ],
                      moods: [
                        {
                          label: "Playful",
                          value: "playful",
                          active: false
                        },
                         {
                          label: "Happy",
                          value: "happy",
                          active: false
                         },
                         {
                          label: "Upbeat",
                          value: "upbeat",
                          active: false
                         }
                      ],
                      vocals: [],
                      instruments: [
                        {
                          label: "Synth",
                          value: "synth",
                          active: false
                        },
                        {
                          label: "Drums",
                          value: "drums",
                          active: false
                        },
                        {
                          label: "Bass",
                          value: "bass",
                          active: false
                        },
                        {
                          label: "Electric Guitar",
                          value: "electric_guitar",
                          active: false
                        }
                      ]
                    },
                  ]
                }
              ]
            },
            {
              label: 'Neo Funk',
              value: 'neo_funk',
              albums: []
            }
          ]
        },
        {
          label: 'Hip-Hop',
          imagery: {
            url: "https://res.cloudinary.com/dffwof1gx/image/upload/v1733704799/hip-hop_mugg6g.jpg"
          },
          value: 'hip_hop',
          subgenres: [
            {
              label: 'Old School',
              value: 'old_school',
              albums: []
            },
            {
              label: 'Trap',
              value: 'trap',
              albums: []
            },
            {
              label: 'Lo-Fi',
              value: 'lo_fi',
              albums: []
            },
            {
              label: 'Afrobeat',
              value: 'afrobeat',
              albums: [
                {
                  title: 'Motherland',
                  cover: {
                    url: "https://res.cloudinary.com/dffwof1gx/image/upload/v1733949029/Motherland_album_cover_bkksoj.png"
                  },
                  tracks: [
                    {
                      id: 1,
                      audio_file: "https://res.cloudinary.com/dffwof1gx/video/upload/v1733949086/Motherland_zmt8on.wav",
                      title: "Motherland",
                      length: "4:06",
                      genres: [
                        {
                          label: "Afrobeat",
                          value: "afrobeat",
                          active: false
                        },
                      ],
                      moods: [
                        {
                          label: "Happy",
                          value: "happy",
                          active: false
                        },
                         {
                          label: "Excited",
                          value: "excited",
                          active: false
                         },
                         {
                          label: "Upbeat",
                          value: "upbeat",
                          active: false
                         }
                      ],
                      vocals: [],
                      instruments: [
                        {
                          label: "Synth",
                          value: "synth",
                          active: false
                        },
                        {
                          label: "Drums",
                          value: "drums",
                          active: false
                        },
                        {
                          label: "Bass",
                          value: "bass",
                          active: false
                        },
                        {
                          label: "Electric Guitar",
                          value: "electric_guitar",
                          active: false
                        },
                        {
                          label: "Percussion",
                          value: "percussion",
                          active: false
                        }
                      ],
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: 'R+B',
          imagery: {
            url: "https://res.cloudinary.com/dffwof1gx/image/upload/v1733704850/R_B_jykyds.jpg"
          },
          value: 'r_and_b',
          subgenres: [
            {
              label: 'Old School',
              value: 'old_school',
              albums: []
            },
            {
              label: 'Modern',
              value: 'modern',
              albums: []
            }
          ]
        },
        {
          label: 'Reggae',
          imagery: {
            url: "https://res.cloudinary.com/dffwof1gx/image/upload/v1733704937/reggae_ecbqtx.png"
          },
          value: 'reggae',
          subgenres: [
            {
              label: 'Roots',
              value: 'roots',
              albums: []
            },
            {
              label: 'Dancehall',
              value: 'dancehall',
              albums: []
            }
          ]
        },
        {
          label: 'Rock',
          imagery: {
            url: "https://res.cloudinary.com/dffwof1gx/image/upload/v1733704967/rock_ol9hku.jpg"
          },
          value: 'rock',
          subgenres: [
            {
              label: 'Indie',
              value: 'indie',
              albums: []
            }
          ]
        },
        {
          label: 'Soul',
          imagery: {
            url: "https://res.cloudinary.com/dffwof1gx/image/upload/v1733705044/Soul_yxf5v0.jpg"
          },
          value: 'soul',
          subgenres: [
            {
              label: 'Motown',
              value: 'motown',
              albums: []
            },
            {
              label: 'Neo Soul',
              value: 'neo_soul',
              albums: []
            }
          ]
        }, 
        {
          label: 'Jazz',
          imagery: {
            url: "https://res.cloudinary.com/dffwof1gx/image/upload/v1733705240/jazz_c8no5p.jpg"
          },
          value: 'jazz',
          subgenres: [
            {
              label: 'Smooth',
              value: 'smooth',
              albums: []
            },
            {
              label: 'Modern',
              value: 'modern',
              albums: []
            }
          ]
        }, 
        {
          label: 'Classical',
          imagery: {
            url: "https://res.cloudinary.com/dffwof1gx/image/upload/v1733945041/Piano_Sheet_Music_xwxbmp.jpg"
          },
          value: 'classical',
          subgenres: [
            {
              label: 'Modern',
              value: 'Modern',
              albums: []
            },
            {
              label: 'Orchestral',
              value: 'orchestral',
              albums: []
            }
          ]
        },
        {
          label: 'Acoustic',
          imagery: {
            url: "https://res.cloudinary.com/dffwof1gx/image/upload/v1733944976/Acoustic_Guitar_Photo_hegcid.jpg"
          },
          value: 'acoustic',
          subgenres: [
            {
              label: 'Folk',
              value: 'folk',
              albums: []
            },
            {
              label: 'Singer-Songwriter',
              value: 'singer_songwriter',
              albums: []
            }
          ]
        }
      ],
      moods: [
        {
          label: 'Happy',
          value: 'happy',
          active: false
        },
        {
          label: 'Sad',
          value: 'sad',
          active: false
        },
        {
          label: 'Excited',
          value: 'excited',
          active: false
        },
        {
          label: 'Pensive',
          value: 'pensive',
          active: false
        },
        {
          label: 'Hopeful',
          value: 'hopeful',
          active: false
        },
        {
          label: 'Angry',
          value: 'angry',
          active: false
        },
        {
          label: 'Calm',
          value: 'calm',
          active: false
        },
        {
          label: 'Playful',
          value: 'playful',
          active: false
        }, 
        {
          label: 'Anxious',
          value: 'anxious',
          active: false
        },
        {
          label: 'Dreamy',
          value: 'dreamy',
          active: false
        },
        {
          label: 'Confident',
          value: 'confident',
          active: false
        },
        {
          label: 'Upbeat',
          value: 'upbeat',
          active: false
        }
      ],
      instruments: [
        {
          label: 'Synth',
          value: 'synth',
          active: false
        },
        {
          label: 'Drums',
          value: 'drums',
          active: false
        },
        {
          label: 'Bass',
          value: 'bass',
          active: false
        },
        {
          label: 'Electric Guitar',
          value: 'electric_guitar',
          active: false
        },
        {
          label: 'Acoustic Guitar',
          value: 'acoustic_guitar',
          active: false
        },
        {
          label: 'Piano',
          value: 'piano',
          active: false
        },
        {
          label: 'Strings',
          value: 'strings',
          active: false
        },
        {
          label: 'Brass',
          value: 'brass',
          active: false
        },
        {
          label: 'Woodwind',
          value: 'woodwind',
          active: false
        },
        {
          label: 'Percussion',
          value: 'percussion',
          active: false
        },
        {
          label: 'Vocals',
          value: 'vocals',
          active: false
        }, 
        {
          label: 'Misc',
          value: 'misc',
          active: false
        }
      ],
      vocals: [
        {
          label: "Male",
          value: "male",
          active: false
        },
        {
          label: "Female",
          value: "female",
          active: false
        },
        {
          label: "Group",
          value: "group",
          active: false
        }
      ]
    }
  }
})