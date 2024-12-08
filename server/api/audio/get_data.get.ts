export default defineEventHandler((event) => {
  return {
    data: {
      genres: [
        {
          label: 'Electronic',
          subgenres: [
            {
              label: 'House'
            },
            {
              label: 'Techno'
            },
            {
              label: 'Trance'
            },
            {
              label: 'Drum and Bass'
            },
            {
              label: 'Electro Funk'
            },
            {
              label: 'Misc',
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
                      genres: [
                        {
                          label: "House",
                          value: "house",
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
                      id: 6,
                      audio_file: "https://res.cloudinary.com/dffwof1gx/video/upload/v1733693546/Memories_pfrdwu.wav",
                      title: "Memories",
                      genres: [
                        {
                          label: "House",
                          value: "house",
                          active: false
                        }
                      ],
                      moods: [],
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
                      genres: [
                        {
                          label: "House",
                          value: "house",
                          active: false
                        }
                      ],
                      moods: [],
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
          label: 'Funk'
        },
        {
          label: 'Hip-Hop'
        },
        {
          label: 'R+B'
        },
        {
          label: 'Reggae'
        },
        {
          label: 'Rock'
        },
        {
          label: 'Soul'
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
      ]
    }
  }
})