export default {
    "RuntimeMap": {
        "@version": [
            "3.0.0"
        ],
        "@xmlns:xsi": [
            "http://www.w3.org/2001/XMLSchema-instance"
        ],
        "@xsi:noNamespaceSchemaLocation": [
            "RuntimeMap-3.0.0.xsd"
        ],
        "BackgroundColor": [
            "00ffffff"
        ],
        "CoordinateSystem": [
            {
                "EpsgCode": [
                    "28355"
                ],
                "MentorCode": [
                    "MGA-55"
                ],
                "MetersPerUnit": [
                    "1"
                ],
                "Wkt": [
                    "PROJCS[\"GDA_1994_MGA_Zone_55\",GEOGCS[\"GCS_GDA_1994\",DATUM[\"D_GDA_1994\",SPHEROID[\"GRS_1980\",6378137.0,298.257222101]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],PROJECTION[\"Transverse_Mercator\"],PARAMETER[\"False_Easting\",500000.0],PARAMETER[\"False_Northing\",10000000.0],PARAMETER[\"Central_Meridian\",147.0],PARAMETER[\"Scale_Factor\",0.9996],PARAMETER[\"Latitude_Of_Origin\",0.0],UNIT[\"Meter\",1.0]]"
                ]
            }
        ],
        "DisplayDpi": [
            "96"
        ],
        "Extents": [
            {
                "LowerLeftCoordinate": [
                    {
                        "X": [
                            "315102.42100000015"
                        ],
                        "Y": [
                            "5808850.8142999997"
                        ]
                    }
                ],
                "UpperRightCoordinate": [
                    {
                        "X": [
                            "323166.05519999965"
                        ],
                        "Y": [
                            "5817089.5708999997"
                        ]
                    }
                ]
            }
        ],
        "Group": [
            {
                "ActuallyVisible": [
                    "true"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "true"
                ],
                "LegendLabel": [
                    "Planning"
                ],
                "Name": [
                    "Planning"
                ],
                "ObjectId": [
                    "92c58664-18a2-11ec-8004-0a002700000e"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            },
            {
                "ActuallyVisible": [
                    "true"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "true"
                ],
                "LegendLabel": [
                    "Transport"
                ],
                "Name": [
                    "Transport"
                ],
                "ObjectId": [
                    "92c58664-18a2-11ec-8005-0a002700000e"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            },
            {
                "ActuallyVisible": [
                    "true"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "true"
                ],
                "LegendLabel": [
                    "Community"
                ],
                "Name": [
                    "Community"
                ],
                "ObjectId": [
                    "92c58664-18a2-11ec-8006-0a002700000e"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            },
            {
                "ActuallyVisible": [
                    "true"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "true"
                ],
                "LegendLabel": [
                    "Environment"
                ],
                "Name": [
                    "Environment"
                ],
                "ObjectId": [
                    "92c58664-18a2-11ec-8007-0a002700000e"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            },
            {
                "ActuallyVisible": [
                    "true"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "true"
                ],
                "LegendLabel": [
                    "Recreation"
                ],
                "Name": [
                    "Recreation"
                ],
                "ObjectId": [
                    "92c58664-18a2-11ec-8008-0a002700000e"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            },
            {
                "ActuallyVisible": [
                    "true"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "true"
                ],
                "LegendLabel": [
                    "Census of Land Use and Employment (CLUE)"
                ],
                "Name": [
                    "Census of Land Use and Employment (CLUE)"
                ],
                "ObjectId": [
                    "92c58664-18a2-11ec-8009-0a002700000e"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            },
            {
                "ActuallyVisible": [
                    "true"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "true"
                ],
                "LegendLabel": [
                    "Trees By Criteria"
                ],
                "Name": [
                    "Trees By Criteria"
                ],
                "ObjectId": [
                    "92c58664-18a2-11ec-800b-0a002700000e"
                ],
                "ParentId": [
                    "92c58664-18a2-11ec-8007-0a002700000e"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            }
        ],
        "IconMimeType": [
            "image/png"
        ],
        "Layer": [
            {
                "ActuallyVisible": [
                    "false"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "false"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "Default:melbourne_s_urban_forest_map"
                        ],
                        "Geometry": [
                            "GEOMETRY"
                        ],
                        "ResourceId": [
                            "Library://Samples/Melbourne/Data/Melbourne_s_Urban_Forest_Map.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Melbourne/Layers/Trees_ULE.LayerDefinition"
                ],
                "LegendLabel": [
                    "ULE"
                ],
                "Name": [
                    "ULE"
                ],
                "ObjectId": [
                    "92c5d48e-18a2-11ec-8000-0a002700000e"
                ],
                "ParentId": [
                    "92c58664-18a2-11ec-800b-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": [
                                            "\"useful life expectency\" = '<1 year'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAWVJREFUOI2dksFKI0EURc+rSCclMxDGrERwViEZexWEfJIfoUv9B50/CkhWjglZKSOuosRNqrs1dV3YBs0EYs/dFdxz362qZ6zR1a+9H1bzPRldABMjLcIwvb57XPXax8Nlu93yDR1jdoQozKgDSOQYCdJFyOzscDKZ/hPwp/tznyQZAE1nVl/XLEo5MKMo+gejm9tlwGW73fKeK0TLOautg5chUQuMaQikh5PJ1AE0GjoBmptggNLT9A0dA9igs7vzvf7tr5n5TfDKdYKe53vOb233JIoqMACisJrvOeesQ/naVWRGXUbXVZ68Ihejxoi8KiiRmxi58DIfmpFUHm0kWoSh64/vH6L0u1ySLylKOdJFen336ACyzE6BWYxabITfPLOQ2dlbkVL/u8rLXzgY3dyGQCrpXFKIUU9RyqKUxagnSUHSeQik7/CnBh816Ozu+K3tnnPWKWuPw8t82B/fP6x6XwFDg7yff0351wAAAABJRU5ErkJggg=="
                                        ],
                                        "LegendLabel": [
                                            "<1 year"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"useful life expectency\" = '11-20 years'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAXVJREFUOI2Vk71qG1EQhb+ZKLukkCxklYG0NqgSGKUzeZaAA/EjOGX8CDa2wM9i1DkYVAXs1qRdC8mGSLtaz0mhHxJFRNHpLpzv3Jm5d4w1Gn583yBJ27jvAxBxR5H361c3g1Wv/X54OjpsUvETzD6ZqRCWzkzKJUuQLinjtNbtZX8FDD5/eFcxvgF1d0/XVRYROTAsRadxfv2wDHg6Omzy2r9jNN381Tp4GaJ4QWRMo1Xr9jIHIPEvQH0TDDD31Kn4CYCNjg92neoPc3uzCf6zHY1j8vOti2obU7ENDGCmgiRtO2hvMe1tJCzFfd+3BVflYPeG8m1BQzkRd24895El2wZIllDkfd85u32UqTv/JP+liMiRLutXN4PZDIr4CgxD8bIRnnmGlHEK4AC1bi8rRQeR/auS2c1kpegs9mH5Co3z6wem0cK4UGgsxSikSUgTKUYKjTEumEZrsQewso0LjY4PdkW1Ddqb2+6N5/7O2e3jqvcXQeq3C45j+l4AAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": [
                                            "11-20 years"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"useful life expectency\" = '1-5 years'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAWVJREFUOI2tkrFKA0EURc97i7vuKrqopWCrkCqNP6KCilj6EVrqP6idiArqj9ikErQV2yiJkExmZedZJAaNwRjwwhTD3HPnMvOEIWpcr89N6WTVRFcAxMJDK3Rq+cbN66BXvm7eLjYX0iTZR9gDK0CS7ol5kBjjxHl/NLN9Vf8R0L7dWppg4g7IVTUZ1iyE4IHGO++r2drlUz+ge3N8j8iCikTD4H6IWYlZ3fmiMrN9VVeANI4PgHwUDNDz5GmS7ANI82xnPpuOnlUkHQUPNHGtsrWoWRpVgWIcuCsrpnSyqhbZMjD00X6XJCa6ouOD36VSyiPgx0fNi4UHbbuyBsTjB0jcCp2azu6evxDstDckf1IIwWOc5Bs3rwrgiuIQaASzciTc9TSc90fwD6Pc/4Vs7fLJ+aKCcRzMXDBrBrNObzWDmcM4dr6ofMLfGnxV82xnPkujam9GkFIe266sze6evwx6PwB8b7P5X+YR5gAAAABJRU5ErkJggg=="
                                        ],
                                        "LegendLabel": [
                                            "1-5 years"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"useful life expectency\" = '1-5 years (<50% canopy)'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAWZJREFUOI2dkkFrwkAQhd+MkJgIGlqPhYKnKDl56U/qf9CKSKu/QfuPevEk6qkgvaqo1I0bcKYHrdhUsOk77cL7Hm92h3BBq1H7puDl60S5KgCo7ifbeDcMos4y7aXzy2baLnuO3yTgEUQJFO7RZaHqKDCIE9Mthp35rwDz/nzvkPMGIGBi91IzUbEAVokmD36lNTsFbKbtsu/6IyjKzJy7BJ9CRPYgzI01UTHszBkAPLfwBCC4BgPA0RN4jt8EAFqPe7eFfO6Dmb1rcKpJ/GnMHfsu10GUZIEBAERJwcvXmYjD02tnkcIlylU5M5gSq8oUBJuZJFjV/YSNlSFUncwBqs423g25VGsslOj1uCR/kqhYBQZB1FkyAMR2+wJgJSL7q/DBs4oT0z1MctR/V/n0C36lNTPWRArqi0gsqmsR3Yno7nCWWEF9Y030Df9ocK71uHfru1wn4hAAVGVqrAxLtcYi7f0CnUC33cGlDyoAAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": [
                                            "1-5 years (<50% canopy)"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"useful life expectency\" = '1-5 years (>50% canopy)'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAVdJREFUOI2tks1OwkAUhc+dJjR2CDTSpYlbSVh14wMQE1a+hg+hS3kH8DFYmRAfgE23sCVulbSFWyyGuS6myI8YbOJJZjGZ+537M5dwRHH8fK61ExKpJgCImDHzOvL9zuwwlnYvaToItNb3AO4AWgHiFmE5IBUAfWbu1mq3bz8Msuzl0nVpBIivlHKPVWaMyQGK81yuPa89BQC1yWxhBL/BAFC8Ba5LozQdBN8GWusHm5mc3+CtCTmA+EWroCQZNqpV51UpOjsFH7SznM8/L5TnUQhgVQa2opXWTqiI6Go77TISl0g1VXlwX0pEJvafy4pyETNWWSYRgEp5A6kwryNVr9+8A/Jkl+RvKmL7vt+ZKQBg5keAYmNkfRqWNUAxM3eB/1plAPC89pR50QLQM0aWxkhijPmwRxJjZAmgx7xobeC9CnaVJMOG51FodwQQkUmWSWTnta8viOOsHWQ284QAAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": [
                                            "1-5 years (>50% canopy)"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"useful life expectency\" = '21-30 years'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAVhJREFUOI2tkslKA0EURc97gaSNLsS4MkG3Dr0Kgp/kPzgQgsM3qH8kSFZOW8dVEhKwO9WBruemlBiD2uCFWhTc8+6r7ivM0PVja0mqUVMpbQB48jtLXSdebfenvTJ5uXppLc9H1X1gF5GxQAXAIMOsDJwnLj3Zrre73wbcvB6taaV8CSyqamXWZt77DBj4bLyztXL48DkgJF8Dy6pamgVPDMmBbuLSeLve7irAQjR/EJJ/hAGCZzE8Fbl9Pq1ptfQkonO/wVObjPIkbSiRNg0ZF4EBEBlLNWqqoOuEr12Ih4pS2tDCyVNSw98DWVHQIPPkd4rzHcHKhaPNypa6jm429nqYXISS/EnBex6vtvsK8OaSY2AQSvIbnAODxKUn8A9V/vwLWyuHD4lLY0HOzPzImw29mQtnaOZHgpwlLo0/4C8bTOr2+bRGpM3QEQx/j/OdzcZeb9r7DiPjrCD2EeBoAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "21-30 years"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"useful life expectency\" = '31-60 years'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAWpJREFUOI2tkk9LG2EQxn8zCxuazSHUHAteje4pBPwySqFF8yHsUb9DkqIg+mWEkJPVXqXXVCLkTdwtO+Nh/Zc0aAN9bi/Mb555Zx5hib5ffv1YlbhlShNAjeup58O99Ph2sVZeP3qD/UYtiQ4c74DkIlQA3MnAY0F6k1Acddr90V8Nzn98WUcrF+B1Va0sm8zMMpAxlm3vbJ3cPDfoDfYbSRJdAg1ViZbBL028AEYhFGmn3R8pQFLTb6Xz2zBAWeP1WhIdAMjp1e5apLVfKvLhPXjhO7NZ8eeTCtUWTr4KXEryqsQtFdENgaVLexMXKqY0dXXneam7/XTIVgXdydS4Vmc6RIhX9/Z46vlQP2+e/QbvlyH5N5lZJkhvLz2+VYAwsUOQ8WNI3oG9ABlPQnEE/yHKz1fY2Tq5CaFIEbrmPjPzOze/d/N7M78z9xlCN4QifYLnJnit06vdNaHaEtENgPJS02G5r3k9AEsGs1e+SH6bAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "31-60 years"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"useful life expectency\" = '61+ years'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAZRJREFUOI2Vk7FqG1EURGfeS7RaR4WIVQbS2qBKjb7A4MKoS6GAmqTwR9hl/A92wG4E3sKdSRHwF6RRFbBbk3ZtZLLx2yd4d1LJxIqIouku3Jl7YLjEEn38+u61862ewG0AIHRtqZqc7l7cL+7yz2F4Oexs5PmBA/ZFzShmACAqUmwYcPIYwlExKMq/Aj58ef/WZ9k3AW3nXLaMzMwigWmKsX+2d377FDC8HHZaefM7yA5Jv8w8l6QEqaxC3S0GRekA4FXePBTQXmUGAJJeQHsjzw8AgKOr0WaTL3+QzFeZn5GYgqWfb1wj+Z6g2TpmABA1c77Ve0Hvtihkz/tYLYqZgG237uVFOSW7ERXXNYqKhK7dzKcJwca6ARQblqqJG++M7yR9NrP/pjCzaMDJ6e7FvQOAX6H+RGAqKa1ElxKB6WMIRwDgAKAYFGWKsQ+p/BeJmUVIZYqxP/+HpxbO9s5vq1B3ARxLCiZ7kKmWqTbZg6QA4LgKdXf+BwCWtz+6Gm02ku/Ruy0AULKbmU+T8c74bnH3N2tc0JagOJtnAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "61+ years"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"useful life expectency\" = '6-10 years (<50% canopy)'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAX9JREFUOI2tkj1rk1EYhq/7vLZNYiKhzWBBcBJaEIQszlJwkP4A/4GLBaHddLRbneoSJ39E7VDoD3DJJLTQSRzSIS39SN586Htuh8RQ0mAMeG0Hnus+5zncYgL3PjxfzOVz1cRaBcjko26nW7/aPDgfn9XNw/LOesV3w1vglUzf0gKA7J7FPFBTO243tvaatwLuf3zxUGHuK6KsoTiO7R7mwvHn09PX+99HAcs76xUKyTdwRSEkk+RRSIwZqEmaPW5s7TUDgAt6hyhPkwEUQoIoD1dFpd21peKd4g9J+WnyTaJjJ027D0KRQhXTn0UGkOnn8rlqIIQVi4mf9jcsLSTWaphVHCcQ47FMb1ZRdi+Tj0KLtM6gJDNhMd/tdOvheuPwzI6fbP/zK4aztavNg/MAoNTvBw2L2VQ5xgxzoXbchv9Q5VHzWvsnl6Vnjz57jgLoCSY1YPiFaQ/8WFMaX56++dL44+nWNUBpd22pSKFKCCsAxHjcIq1fbxyejc/+Bnuerr99RfR5AAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "6-10 years (<50% canopy)"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"useful life expectency\" = '6-10 years (>50% canopy)'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAVlJREFUOI2Vk71KA1EQhb+ZaIJbBU0jCLZGBDFBfBUbG4X4ELHUh0gwIuRpRLI2orZiocVGYuHK5mfGYhNCNBj3dPfe8809d5grzNPJ9ioaVBApA+D+iMUhrYf3n1aZWdWqJVzrCKeI9MELY1uCex6ngdgFzU70u8Dx3ibLSzc4RVQLc5OZJQg9BsMDru6epwVq1RKi90AJ0dxceCK3ERDhtkOzE2m6mzvDKS6EAURzOEVc62mCo/01Al4QXVkIzz7ni9HnhhJYBaSfCQYQ6aNBRXHdmnY7i7yASFmzg7NSxJ5AkuyoJLg/KrGG4PnMvHsei0OlfdvFpYnZ/1OYJTgNWg/v4x6MzhF64yFZcLONEHqIXQCkBZqdiMHwAIj+TJKepd7xf5hO3t3bB9X1a9AAfBeIwQEfAp/gDtIAO+QyfJ1gs79xoqP9NQKrpDMCiD0Ra0j7tvvT+g1NyY1JRbtaowAAAABJRU5ErkJggg=="
                                        ],
                                        "LegendLabel": [
                                            "6-10 years (>50% canopy)"
                                        ]
                                    }
                                ],
                                "Type": [
                                    "1"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "1000000000000"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    }
                ],
                "Selectable": [
                    "true"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "false"
                ]
            },
            {
                "ActuallyVisible": [
                    "false"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "false"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "Default:melbourne_s_urban_forest_map"
                        ],
                        "Geometry": [
                            "GEOMETRY"
                        ],
                        "ResourceId": [
                            "Library://Samples/Melbourne/Data/Melbourne_s_Urban_Forest_Map.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Melbourne/Layers/Trees_Age.LayerDefinition"
                ],
                "LegendLabel": [
                    "Age"
                ],
                "Name": [
                    "Age"
                ],
                "ObjectId": [
                    "92c5d48e-18a2-11ec-8004-0a002700000e"
                ],
                "ParentId": [
                    "92c58664-18a2-11ec-800b-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": [
                                            "\"age description\" = 'Juvenile'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAXVJREFUOI2Vk7FOG2EQhL9dEx8JjRWosEVakFy5cUF1Qpb8JjxEUoZ3gDwJkhVRpUjjKhK0JCTVgYwiZN+h20lhHwLHinPT/dLMzuzuv8YKnH8/f7vlSc8acQCg0i8fIh8P94Z3y1x7/rj4ebHTdL0HjsEKMyUAkuWgJnBWhJ2k7TT7q8CXX5/fYf4V1HL3ZFWyiMjBJij6h7tH108F5s58M9gxt8YqcQWFSkFWBN20nWYO8Mr5AGqtEwPMOWotWsVGN6PtNxsbP9zs9TrxUjvT349FxzfNeoiijniRpdjypOfmtl9Nu5bclFgjDry+80u4QlfzPdeDZLlKv/SZNMZo1vdW8yHysQ86g1uJT/NP8n9YcM+Ge8M7B3gMPoJNFCrX+oZKsEkRdgLgAGk7zVD0Bdm/kkRELshQ9Kt7eNrC4e7RdRF0hZ2GNI3QvRQzKWYRug9pKuy0CLrVHcDSNVYY3Yy2N8165ra/iH01k8aDzuB2mfsHY6S+C1CUOsUAAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": [
                                            "Juvenile"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"age description\" = 'Mature'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAXtJREFUOI2Vk0FLG1EUhb97YyaUpBBqlkK3VWcVAvlDymzMyqUu69JVunDa/qGCZGXVrXQ7SoQMaSaZd7qIkTINsTnwFo93v8vhvnONNfp2c/nBrdV11z5ACHYXNBkdx6dP1Vr7+5Jep516kzODxLACUwMA2UwoEqTznIukl2T/NPj+88vHmtd/GNY2t8Y6ZwqaCY3LMO8fHZ48vDZIr9NO1OQG6Lh7bR28UgihBLIiJ056SeYAUcvODWu/BQO4e82wdr3JGYANb4e7773xy8zevQVXnEwX5WTPm+x0EcU2MIBhhVur62b2CbR2aJs7qOGufd8arMgl3YPNtiZlsxDsznMWI4xoax5FQZORDw4Gj4KvCvpvF8tAkR7Hp08OUEz0WWj8EpKNCiGUQuN5zgWAAyS9JCvDvA9km5y8vGVlmPdX+/D6C0eHJw9FTizjStJUQc8K4ffy6FnSVMZVkROv9gAq27jS8Ha422Snu8wISLrPWYwGB4PHau0ftPu+5Sgiz0YAAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": [
                                            "Mature"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"age description\" = 'New'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAXVJREFUOI2dkz9PG0EQR9/syT4SGiu4jEQbJFduXFsoEt8khStMScpQ+lwhQT5JJBRRp3EVCVqU9oJMQZzl2Pml8J8Ex4pjnrTFaueNdmdnjBUcfjp8pe2sHcQegBtXdp9Gw4Ph7XKs/bnpX/abZHZshHcyPQD57CiarC78nKSToluUfyU4+ny0S82+gDUsWM4K5IqgMZU6g/3BzSJB/7LftCx8xaxpZtkqeZFESkilkreKblEGAMvCe7DGOhlgGmMNMjsGsN5Fb2crf/nNgr1YJy89Z+I/Hl+HvJa3ZwXbCJketJ21AyG84Xe1NyEPYi88Q3xCwP0aiM9woxtXIVZxZLL6prbJ6nafRuH07el30Mdpk/wfckXh58OD4W0AUPIPoLGktFaWEmhM0glAACi6RUmlDlL5r5vIFZFKKnXm87D4hcH+4EbJW6AzuSYuv3P5z9m6k2sCOlPy1nwOYGka5/Quejt5LW/PegTcr2MVR9N6PeUXaifC3NgdOMoAAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": [
                                            "New"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"age description\" = 'Over-mature'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAZRJREFUOI2Vk8FqU0EUhr8zifemoUiwWQouhJKIIGSTNxCELoord91Y8xB1aR8i6sK+gFTJqm/gJitpYnbFhZvbEiEmmYl3fhemQWNozL8b5v/+c+ZwxlihB28e30mS7UZEdQCH9UIYdc8Pz66WvfbnYbe9Vy2nyRFGS0YwLAUQ8iYSRHvsw/Gg1cn+Cai/fXovvWWfgIq53+CyFOWBoZ+p2Xv+/mIRsNveq5ZL6WehqnOusAq+VowxNywbT/3DQauTOYCtUvoSqKyDAeaeSjlNjgCsdrK/UzL31cxtrYP/fk6chDC660q5NSTCJjCAjJAk2w0XC9TMVg/tJhmWRlR3m4LLci6nL8lvCgp5h/XctKCuGcmmASaSEEZd1z84vZTs9XxJ/q96lEe0zw/PrhzAZOpfAcMYY74OnnuGYx+OARzAoNXJ/ExNw7KbOlGUNyzzMzWv/8Ni87KPve+3n9x/VywWy6BHksbzq5+SfoAkrD2Z+mdfXnz4tpjFqkq1k/2dUm6NWKAG4HL604K6/YPTy2XvL/FDuDreCY34AAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "Over-mature"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"age description\" = 'Semi-Mature'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAVRJREFUOI2dk79OAkEQh79ZziNaoVCa2BEwJsZreBV7E0zkEbCUR8DIJSS+jjGhMoB0xsLmIFj4545jx+KOEJCI8HWbmd/s7OxvhFVcHB/gqoeRMgBWe0TSod0dLafKwqlaLOA4dUQuESIgm0ZCFBfVFnHcwB8EvwtclY8QeQDJYSTLKqyGoGNUK9z2XuYFqsUCO84TQgExmZXiGWqnKAGT+AR/EBgAXOcaJLdWDCQ5ksNx6kkHtVIeMq8Y2V0rXnzOF996aAAvHdhmCBGuegZMifm0NyGLkbLZQriAAdsHwi20IVZ7BuiguBvLFZdIOoZmf4ion5jkn1gNUW3R7o6SGUTxTeIwO11/s52CjonjBkBSwB8EqFZQgj87sRqiJLnpPsyd9xi8c7Z/j2P2UE6BzzQSAx8oimiLSXzO3fPbTLa4jTNqpTzgpR4h/akOzf5wOfUHdGOIbIoaTooAAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": [
                                            "Semi-Mature"
                                        ]
                                    }
                                ],
                                "Type": [
                                    "1"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "1000000000000"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    }
                ],
                "Selectable": [
                    "true"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "false"
                ]
            },
            {
                "ActuallyVisible": [
                    "false"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "false"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "Default:Overland Flow Routes"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Samples/Melbourne/Data/Overland Flow Routes.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Melbourne/Layers/Overland Flow Routes.LayerDefinition"
                ],
                "LegendLabel": [
                    "Overland Flow Routes"
                ],
                "Name": [
                    "Overland Flow Routes"
                ],
                "ObjectId": [
                    "92c5d48e-18a2-11ec-8005-0a002700000e"
                ],
                "ParentId": [
                    "92c58664-18a2-11ec-8007-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jYBgFwwAwMjD8baDEACYqOWQUDG0AAGxEAYFkZ73KAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": null
                                    }
                                ],
                                "Type": [
                                    "4"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "1000000000000"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    }
                ],
                "Selectable": [
                    "false"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "false"
                ]
            },
            {
                "ActuallyVisible": [
                    "false"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "false"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "Default:Census_of_Land_Use_and_Employment_(CLUE)_Suburb"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Samples/Melbourne/Data/Census_of_Land_Use_and_Employment_(CLUE)_Suburb.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Melbourne/Layers/Census_of_Land_Use_and_Employment_(CLUE)_Suburb.LayerDefinition"
                ],
                "LegendLabel": [
                    "Suburbs"
                ],
                "Name": [
                    "Suburbs"
                ],
                "ObjectId": [
                    "92c5d48e-18a2-11ec-8006-0a002700000e"
                ],
                "ParentId": [
                    "92c58664-18a2-11ec-8009-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAADlJREFUOI1jZOfg+iAiJvOIgQzw5tUTORYRMZlHNW1rl5BjQEtVcAwTORqRwagBowaMGgABjJRmZwC3iQ9b7MBThAAAAABJRU5ErkJggg=="
                                        ],
                                        "LegendLabel": null
                                    }
                                ],
                                "Type": [
                                    "3"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "1000000000000"
                        ],
                        "MinScale": [
                            "20000"
                        ]
                    }
                ],
                "Selectable": [
                    "false"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            },
            {
                "ActuallyVisible": [
                    "false"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "false"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "Default:building_accessibility_location_map"
                        ],
                        "Geometry": [
                            "GEOMETRY"
                        ],
                        "ResourceId": [
                            "Library://Samples/Melbourne/Data/Building_Accessibility_location_map.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Melbourne/Layers/Building Accessibility Locations.LayerDefinition"
                ],
                "LegendLabel": [
                    "Building Accessibility Locations"
                ],
                "Name": [
                    "Building Accessibility Locations"
                ],
                "ObjectId": [
                    "92c5d48e-18a2-11ec-8008-0a002700000e"
                ],
                "ParentId": [
                    "92c58664-18a2-11ec-8004-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": [
                                            "\"accessibility type\" = 'Alternative access'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAX9JREFUOI2VkzFLY1EUhGfOXRJ3I0tYU6gItgqp0uQPKSnEQi21XEtjIYJx/UM2qRa0lQVj8ZREDMmLuWe2CE/WGMy+6S7MN3fOvRxihr7/2vux6KGmgE0AYMTNi8X28/bp07SX/x5WWvsVhXBIsEFqJKEIACRSiQVBLcZ43Gk0kw8By1cH60a7Flg2sjirmUspoa7L6w9bJ3dvASut/Qq/hN8QKzSGWXAmuSKoRONY7TSaiQEAzY4ElufBEy+DwLJCOAQArp7tLOFb6Q/Jr/Pgd+O4Bn29rpkWSjVAozwwAJAaLXqoGegb2WvnkYSiAjYtLzgtg+yWRJoXJJEy4sY47LcBFvIGSCy8WGzb/e75I9wvXfrvFi6lglrP26dPBgBy/0moK1ece7MrEuoyxmMAMADoNJqJy+ugks+auJROPF7P9uHtFx62Tu40jlW6X0gaSN5z96G7DyXvSRrQ/ULjWM32AJjaxkyrZztLWijVQN+Y9LZbDvvt+93zx2nvX8Ah0kn1rtJfAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "Alternative access"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"accessibility type\" = 'Not applicable'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAUhJREFUOI2tks0uQ1EUhb910FYYNGooMVXuqGniSQxIjD0EQ94BUwkDTyKRjlBTMS2pxE1/rp5l4GqoBhXf7CR77b322UuM4WqDBZWoBagCRGi6SyM553G0Vh8fl5sszs1oF9gB+jJFAIseUACO0swH9TNaXxpcb7EcpnWBKYeg4jhnMbqHaMcXr6+dcjdskE++AhaDNDVOPGxiD4BWmjmpn9EKAPPT2sOUfxIDBGkKU85XRTfbVIJ0L2n2J/GIk86g46WAqRn6k4hz+ipRCxIr5L89CTLFANXwh8mfCDa3vN15Iix6EZoB0dBbSCal4C6NsHrCA+Y4Rv/aRV57lJzzGACeX7yPaOch+V5sDxDtNPMB/EOUh1dYO+UuzZwIDm13ov0Uo7sxuhvtJ9sdwWGaOXkXf3LwkZttKpiaxApAfqnG6gkPo7WvHVGhYsKgp2EAAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": [
                                            "Not applicable"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"accessibility type\" = 'Ramp'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAYVJREFUOI2dk7FLW1EUxn/nvvY9H7YgNWOha4VMWfJ/iLhkLFgwk3bUsY7GKaIBR5dS/D+6ZCroKl2fEonh5b3w7ueQF60xqPEHd7ic7zv3cO45xgy2vv36FMRhzZutADjpvEjz7sHJ+vW01v6/bG+cVmxhccdw32XkQFSGMhOh8McaDvZanUbyJMGPzd9f7H34B7Rk5iJmIPkMrKdRXt8/XLu8T7C9cVpx8ce/QMXMglnmhyQqgMSn/Wqr00gcgMUfdscvP28GGGu0ZAuLOwDWbJ4tx8G7f+Ysfsn8qBKvtBgMP7soCGplw+ZCRh7EYc0hvvLQ7XmIvNmKe4PxEQ7jAsje4M2cdO6youiaCOd1mwiLNO+6dnv1SqbOeEheh+Qz4Y8PTtavHYDS259gvXJIXjCrAOtpONgDcACtTiPRKK8DyXOVlLFEo7w+2Yf7X9g/XLv0ab8qOJJX6qUbLw3LcyOvVHDk0351sgcwtY0Tms2z5SgIauWMgHGRFUW33V69mtbeAe52wEHdr41PAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "Ramp"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"accessibility type\" = 'Small lip or steep ramp'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAW9JREFUOI2Vk71qG1EQhb+ZgP4qE6uTcIILI4MqNXqkvEMcI5bEfgY7b5RGVcBCRbATudsYBYL2B3tOipWM4gg7e6p74XznDnNnjB363p+89nZrZM4xgIKryPLpwSK5e+q17cvt0aRr1jnB9E5YadAEEBSGGsgupdVZb56k/wR8e/vxTbPV+ALac/PmrspCUYAti7wcH16f3jwG3B5NunjnK6jr5q92wVshD2ApsRr25knqAObtD+uXn4UBKo/2zDonALYYnO87/sPM2y/B25Iiu/+d9d3wkbCyDgwgrPR2a+RIg02368igac6x1wWfyjGbCYq6oKBQcOUipoYadQMMNSLLp96fvf8JfK6G5P8UigLZ5cEiuXMARfYJbFkNyYvwA9hSWp0BOEBvnqRFXo7B0ucqWY9yWuTleLMPj79weH16Q6yGBhdSZCH9kpRLyqtzZAYXxGq42YOqFzu0GJzvGz5CGlQum4mYrvv1l/4ApAq6N+RpN/UAAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": [
                                            "Small lip or steep ramp"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"accessibility type\" = 'Step free'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAYVJREFUOI2Vk81KY0EQhc+pJjcaXYQxi1GE2Sq4yibPIijCDJKH0KW+gxlREAd8lmyy1a2MqIsoEfLjvbHruDAJkok69+yaqu/0obqLmKFfx6vfrORVua0DAM0vvW+tk92bx+levj9sNpYrpcWwZ2JdUEaiCAASUoKJU41+Nx5e1O/a/xj8/PP9R0ChKahsZsVZydw9JdiJGNZOt+6vAcDGNwcUmgAqH8EAMKpVAgrNzcZyZWKwsBD2BZVpDB/Bk8jGIKhcWgx7AMDts5WluRD+0jj/Ffxecg18oFVLGKqCsjwwAAjKrORVI7U2nnYekSjKbd3ygtMyiVcS0ryghJTml5YptggmeQ0IJt63lp3v3D4I+u3u/53C3VOnGie7N48GAL1ePCDYkSt+Gd0VCXb63XgIjD7SRf2uHTGsAWh/lmRUa0cMa+N9mLzC6db9dbf3sgHgSK6Buz9J/iz5s7s/yTUAcNTtvWyM9+BtFjO0fbaylDBUSa0BgMSrTLF1vnP7MN37Cg54woLus55uAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "Step free"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"accessibility type\" = 'Steps'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAWBJREFUOI2dk71KA1EQhb+Z6IZAiqApg0KqCKnS5E1sIlj6EFrqO6idoI1vYpNKMJXgT7lKhIU1G/ceCzdRY4jGD25xmTmHYX6MOdxfsuaBToAtAIeb4PQ3tnmezbWvn8EF9eqK7ZuxB2RAuQiNgEjiJHnTUatH/MPg9pzNKLIrRM3dyswhBI0whlmmbnOHu6nB4IJ6ddWugbqbleaJpyZSDsTJWO1Wj9gBqqt2gKj9JgZwsxKiVl2xfQB7PGPdKvZgZpXfxF+RlOao4XmFDh8NW5bMAx23QIvPbi9DOcCW/0P4DZcz4GPOyzJyuPFSSh+I/mEQBafvjV2eBKch6M9VhKCRxMnGNs8OkIx1iDEslmSxWMoxhsmbjgAcoNUjzjJ1gXhRJUUszjJ1J/cwnUJzh7tkrDbGsaRU0ouk1+K9SEoxjpOx2pM7gJlrnPB4xnpeoVPsCHIGpZR+Y5en2dx3eXulXwvnBkYAAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": [
                                            "Steps"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"accessibility type\" = 'Too complex to determine'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAW9JREFUOI2tkjFLm1EYhc95b8lHo4PUDFWErgqZsvTPCE6Swal2tKOO6iSYdhL6Z7pkKugqFXWIEsEYv+A9x6FobRqqH3i2C+9zznnvvcQEffu08K6e1BJiCQACOrzJ0V3dPbkcn+XTQ2d9rjFNbjjYhjkiXACAwRJ0jXLn2t5q75z1/jH4/vn9B/DND9AzwSgmNZNVwuzDdx+Xt8+PHw0663ONqUg/QTSCTJPgPybOMHoD5WZ756wXADAV6cvv5P/DABBkAj0zTW4AAA/W5mdTnb+C8fY5eGyd4fCOC8HCLZijKjAAwBzVk1rBSIsPt11FhAshlqJy8pjCykcGy6qgwTKgw3DJLuha5Wi6dpOjGyt7pxcwv8p6cQtZJeXO6u7JZQDAQHkTZl92fh52htm/treAV/jKj6+wvH1+PFBuwtyXNZR8ZenW0q3kK1lDmPsD5eYD/FeDpzpYm59l4RYjLQKAlY9csruyd3oxPnsPW1jEaJmtXKcAAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": [
                                            "Too complex to determine"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"accessibility type\" = 'Undetermined'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAXZJREFUOI2VU7FuGkEUnNmVFnI0KKaM5BK7skTDr+SKa6DIRzhl/BFEOmTpivsWGijtNkqRBlukuIs4Zd+kOZBFcOKbbjVv5o2eZokzmM/n751zE0nXAEDywczWeZ4/n87y5SNN01GSJLfOuU+SGpI9AJC0JxnMbFHX9V1Zltu/DGaz2aX3fiVp6JzrnUtmZnuSuxjjdLlcfgMAd9jsvV8BGL0mBoCWG3nvV2majo4Gg8Hgs6QhSf+a+BiZ9JKGSZLcAgCzLLvo9/vfSb77n/glJP0ysw8uhDCR1HQRtwaNc27iSF4drt0FJHuSrl1X4SmcpEdJ+67CthsPrmmaNcnQ1aAt1toVRfEk6auZvTmFme3NbJHn+bMDgKqqvpDcSYpviB5J7uq6vgPaIpVluY0xTgFs/5Wk5bYxxunhPxybt9lsfo7H4/sQQgLgRlLdUr8lVQAEYFFV1ceiKH4cb3FuU5ZlFyGECcmrNvZj0zTroiieTmf/ANNmwUE88ekSAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "Undetermined"
                                        ]
                                    }
                                ],
                                "Type": [
                                    "1"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "1000000000000"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    }
                ],
                "Selectable": [
                    "true"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "false"
                ]
            },
            {
                "ActuallyVisible": [
                    "false"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "false"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "Default:melbourne_bike_share_locations_map"
                        ],
                        "Geometry": [
                            "GEOMETRY"
                        ],
                        "ResourceId": [
                            "Library://Samples/Melbourne/Data/Melbourne_Bike_Share_Locations_Map.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Melbourne/Layers/Bike Share Locations.LayerDefinition"
                ],
                "LegendLabel": [
                    "Bike Share Locations"
                ],
                "Name": [
                    "Bike Share Locations"
                ],
                "ObjectId": [
                    "92c5fb9e-18a2-11ec-8000-0a002700000e"
                ],
                "ParentId": [
                    "92c58664-18a2-11ec-8008-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAApdJREFUOI19k09oVFcUxn/33TvvzXvzJhknZhKaEBPQqIlK7aZKCVGrOIugpd1EXKRugn+Q4KYUF10UadOVlECgWQmt0qVKpCOtoIJLQQ0FiYu0JNOY0dgZZzLz5s2buS6UsWOmfvDBvZfv/M5Z3COGh4eV67pR3/djWuuwUkrwHgVBoIUQnmma2UKhkFeA+1no/pFPe71LpmW+r7Yuv+xzKx3+8he2XlNSykinzA/1bt2GMNY3z2bSVPwyLfEEluMCoGuazqePh6SUfxhKKUMLIUTIBhlucE1L1N7TtH+/iud59XcRstFCCKWUYdRbmU6Dc8+XKQweQ236mMUJC9ONN2be6C1A2XWXvRJiz0miQ6fI/f4DnefnyGaWGjL1svppZQ6AxaV/QCpUNkd0/wTu3hMsXxgk1DnA4oNbtDgWra2tTSYAloMoiXN3kG6CttFp0ue7kbFu2sZ+RrZ0YA8kCX0+TS6XazKBNHF2fMGzn47S3R4j+/AqiTO/UfrzBkJZWJmHIKDafwCEbAIIx8ilvqPnYp7VKyeJH/qK1cld1KoB1r5zGAe/QSiLaiGDCNlA8R2AE6dn9wFWv91MNfB5OXWPjZs/AqD0+Cr5Z0sARBM92D2DMHf3NUBrXVa6VilVDOxYnLbB4XWfyY5sxP5ge/1eyr5A6VpFa10WY2Nj4XQ6nfjQWun3ayJsSCkmdnrXez9JNkD+upfix7nwkVq1qk1Dew/KHfNdXV0ZATA+Ph5aWFgwfd8PRSKRsO/7G6Z2/X27//BoAmD+5q+Zs4827TNN89+1tTXPNM1KX1+fPzMzU2m2eUYymXSDIOiY7H9yGeDr+S3HlVIrqVSqANT+G/7f1R0ZGXGKxWIUwHGc/OzsbLFZ7hWps+RVRIveNQAAAABJRU5ErkJggg=="
                                        ],
                                        "LegendLabel": null
                                    }
                                ],
                                "Type": [
                                    "4"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "1000000000000"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    }
                ],
                "Selectable": [
                    "false"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "false"
                ]
            },
            {
                "ActuallyVisible": [
                    "false"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "false"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "Default:melbourne_s_urban_forest_map"
                        ],
                        "Geometry": [
                            "GEOMETRY"
                        ],
                        "ResourceId": [
                            "Library://Samples/Melbourne/Data/Melbourne_s_Urban_Forest_Map.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Melbourne/Layers/Trees.LayerDefinition"
                ],
                "LegendLabel": [
                    "Trees"
                ],
                "Name": [
                    "Trees"
                ],
                "ObjectId": [
                    "92c5fb9e-18a2-11ec-8001-0a002700000e"
                ],
                "ParentId": [
                    "92c58664-18a2-11ec-8007-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAPJJREFUOI2l0jFOAkEUxvHfLDHGmFhwAzu9hLFzGyo7Ki6gNyBm9QbSmNh4ASubrbmAJhYaGm9AQaHFJowFLKyBlUW/cuZ9/+/NvMc/FVZOrhyILpAKjkH0hlwwkJnUA/o6ggeJ9tq4qbGo58bTKqCvI/Eo2Pm156gwdV5CQqXtj9rkdZ0EhzKTZH502dgMifb8n5SAtLF5qbQKONraPp9Qsqluk0rA+9bO2W4sAPkfwvMq4NbUuLF1NsbBEpCZiHqiYqM5KkS9cqVbi4uhkRMvOBPs1SZH3eoqt34UDI2cusMndrGPLzzjXtB17bXxU5voG7GMPbY9oilTAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": null
                                    }
                                ],
                                "Type": [
                                    "1"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "1000000000000"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    }
                ],
                "Selectable": [
                    "true"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "false"
                ]
            },
            {
                "ActuallyVisible": [
                    "false"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "false"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "Default:City Circle Stops"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Samples/Melbourne/Data/City Circle Stops.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Melbourne/Layers/City Circle Stops.LayerDefinition"
                ],
                "LegendLabel": [
                    "City Circle Stops"
                ],
                "Name": [
                    "City Circle Stops"
                ],
                "ObjectId": [
                    "92c5fb9e-18a2-11ec-8002-0a002700000e"
                ],
                "ParentId": [
                    "92c58664-18a2-11ec-8005-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAnFJREFUOI19U01PE1EUPW/m9XVsh34iJalGipFobAyJFAkJFlcSUokbQoAFbiDxBxg3/gIX/gBWbowS40JSI34kYqJgWCAbNypMopkoBGiHmQ6d6fQ9F4QJTZGzeS/nnXvuuS+5JJ/PU1VVW1zXjQkhFEopwQnwPE8QQqqMsbJlWSYFoCYq2kgmoTwOBpWTan04ThXabvWOhdMvqSzLYeY5A10Xr4JIB82NUglGebehKBpLIBqPAwAEF9A/LQ3IVH4vUUolEIlQFoRMGWTKcK0wgc7ufnABcAF0dvej79ak/05ZECASoZRK9LADPRJ/+dUczmVzuHJ92OeWis/Qnj7TNI7kGzAFlCmwTBO54XFsrC2jrK+jrK9jY20ZueFxWKbp6/y6w8vO758H8xsG9i0D3LXh7O0AALhrY98ysPvnF+q20ZCA4hjkR6eRH51u4ldfP23ifAOJBgAAAcbwY/Uzoq3t2NY1cM7RdvY8jO2/CASYr2syUEKqf754dB+eV28QCs5x4dLlpgT+JwbVKIJqFPtVB7fvPkAkmUJHtgcd2R5EkimM3XsIs2L7Oj+BEMIhgtdqXh2ReBIcBN+W3iKWSII7NgAglkji67vniCRacaolhr3SDojgNSGEQ6amphRd19siwuriXl2RZJn0ZaLzvYM3G6KuLL7BF80Y4fW6kKhc3SPq93Q6vUUAYGZmJqBpGnNdNxAOhxXXdeP5lLd4Y2SsDQA+zM9tfdykg4yxUqVSqTLGaplMxp2dna0dt3nS0NCQ6nleqjdmPwGAlXJoklK6ubCwYAHgR8X/Xd1CoRCybbsFAEKhkFksFu3jdP8AIMPsYtSVuH4AAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": null
                                    }
                                ],
                                "Type": [
                                    "4"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "1000000000000"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    }
                ],
                "Selectable": [
                    "false"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "false"
                ]
            },
            {
                "ActuallyVisible": [
                    "false"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "false"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "Default:SyringeBin"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Samples/Melbourne/Data/SyringeBin.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Melbourne/Layers/SyringeBin.LayerDefinition"
                ],
                "LegendLabel": [
                    "Syringe Bins"
                ],
                "Name": [
                    "SyringeBin"
                ],
                "ObjectId": [
                    "92c5fb9e-18a2-11ec-8003-0a002700000e"
                ],
                "ParentId": [
                    "92c58664-18a2-11ec-8006-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAoBJREFUOI19k8FLXFcYxX/fvXfum5k3IzN1GE2UhHGhjQSKpcVSMAoScGFCt01JzUpwEZJ/o2SRZFlXhVIK3TVx4aLQFkqLqwYJSmJS6+BgnGiiceY58+b5bhclE0XjgW91zzn3x+V+Mjo6ajKZTDYMw5xzLmmMEU5RFEVORBrW2p1arbZngMxi49OrcWH4O8+zp2XbajZD1NbCjT5+/dlorf09OkeGB/oQdfzyysZL7s/0c+en57hEHkRwsWNh69mI1voXY4xREjlJeupY2AEpT/ikP8dAr8+TaoxNGEAQ58QYo9qplFXHZm29yrc3B8mmDHdnLvJhV9Q+eytzuODdSwV8PV7kbGeRV3stAP7dDOgtpNgJj5K2C5bXGwDs7+9zbaSD6988IpFIcONyN59dyBMduCO+YwUAu7u7DJWSPN8I+Kgvi+d5iAj1xgHbb0Ier9UA70hBm8caQWvh1hfnyCQNG9tNLl3sQIlQ3Wny6k3IYjnGGsEe+iptgo60xojPUrnGH0u7jH9cYKVS58wHSbQSlBJSnqIjrU8myPmas4U05WrAtbEinw/mWSrvYxQYLWglZFOanP//tAmcc81YdMtFDTrzGRbLAa2oCdTo7c7x10qDP5+uoJRwvsvHWsP26xqx6JZzrilTU1PJSqVS3HSlfiFKaqVE+r58cGX0whHUh78v4/758epBHDuHaXTJ6tOenp6qAExPTydWV1dtGIYJ3/eTYRjmX/Te/u365FAR4Pu5v6vd6/fGrLWv6/V6w1rbKpVK4ezsbOukzVMTExOZKIq61grTPwCc35r9yhizOT8/XwPiw+b3ru7k5GQ6CIIsQDqd3pubmwtO8v0HJLjmnZTZ56cAAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": null
                                    }
                                ],
                                "Type": [
                                    "4"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "1000000000000"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    }
                ],
                "Selectable": [
                    "false"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "false"
                ]
            },
            {
                "ActuallyVisible": [
                    "true"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "false"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "Default:City Circle Route"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Samples/Melbourne/Data/City Circle Route.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Melbourne/Layers/City Circle Route.LayerDefinition"
                ],
                "LegendLabel": [
                    "City Circle Route"
                ],
                "Name": [
                    "City Circle Route"
                ],
                "ObjectId": [
                    "92c5fb9e-18a2-11ec-8004-0a002700000e"
                ],
                "ParentId": [
                    "92c58664-18a2-11ec-8005-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAADlJREFUOI1jYBgFjH/qGEIpMYCFmYlhFSUGMFGimYGBgYHx/5VV/wfYBQ0MA+sClr//GMIoNWSkAwDQmgrbb2Xy5QAAAABJRU5ErkJggg=="
                                        ],
                                        "LegendLabel": null
                                    }
                                ],
                                "Type": [
                                    "2"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "1000000000000"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    }
                ],
                "Selectable": [
                    "false"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            },
            {
                "ActuallyVisible": [
                    "true"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "false"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "Default:Major Features"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Samples/Melbourne/Data/Major Features.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Melbourne/Layers/Major Features.LayerDefinition"
                ],
                "LegendLabel": [
                    "Major Features"
                ],
                "Name": [
                    "Major Features"
                ],
                "ObjectId": [
                    "92c5fb9e-18a2-11ec-8005-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAADdJREFUOI1j5Gfg/y/PIM9ADnjI8JCBRZ5BniGWIZYsAxYzLGZgIksnEhg1YNSAUQMggJHS7AwADtsImeqLIoYAAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": null
                                    }
                                ],
                                "Type": [
                                    "3"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "1000000000000"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    }
                ],
                "Selectable": [
                    "false"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            },
            {
                "ActuallyVisible": [
                    "false"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "false"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "Default:CLUE_Block_2012"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Samples/Melbourne/Data/CLUE_Block_2012.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Melbourne/Layers/CLUE - Number of Establishments per Block.LayerDefinition"
                ],
                "LegendLabel": [
                    "Number of Establishments per Block"
                ],
                "Name": [
                    "CLUE - Number of Establishments per Block"
                ],
                "ObjectId": [
                    "92c5fb9e-18a2-11ec-8006-0a002700000e"
                ],
                "ParentId": [
                    "92c58664-18a2-11ec-8009-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": [
                                            "\"Establishm\" <= 50"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1j/Hth0X8GCgATJZpHDRg1YNSAwWQAACxDA473ZfNCAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "Less than 50"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"Establishm\" > 50 AND \"Establishm\" <= 200"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1j/Lsu+z8DBYCJEs2jBowaMGrAYDIAAMN+AzVNbvXgAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "Between 50 and 200"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"Establishm\" > 200 AND \"Establishm\" <= 300"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1j/Ntr85+BAsBEieZRA0YNGDVgMBkAAH8+AuUM1DtsAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "Between 200 and 300"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"Establishm\" > 300 AND \"Establishm\" <= 400"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jfBbK+5+BAsBEieZRA0YNGDVgMBkAAIBUAmeQK5d5AAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "Between 300 and 400"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"Establishm\" > 400"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jXGbG/J+BAsBEieZRA0YNGDVgMBkAANZCAf7VaxhTAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "More than 400"
                                        ]
                                    }
                                ],
                                "Type": [
                                    "3"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "1000000000000"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    }
                ],
                "Selectable": [
                    "false"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "false"
                ]
            },
            {
                "ActuallyVisible": [
                    "true"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "false"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "Default:BuildingFootprints"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Samples/Melbourne/Data/BuildingFootprints.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Melbourne/Layers/BuildingFootprints.LayerDefinition"
                ],
                "LegendLabel": [
                    "Building Footprints"
                ],
                "Name": [
                    "BuildingFootprints"
                ],
                "ObjectId": [
                    "92c5fb9e-18a2-11ec-8007-0a002700000e"
                ],
                "ParentId": [
                    "92c58664-18a2-11ec-8004-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": [
                                            "\"FLOORS\" <= 16"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1j/M/w/z8DBYCJEs2jBowaMGrAYDIAAGGcAx3rFI91AAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "< 16 Floors"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"FLOORS\" > 16 AND \"FLOORS\" <= 31"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jNK/b8Z+BAsBEieZRA0YNGDVgMBkAABUPAowDhee8AAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "16 - 31 Floors"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"FLOORS\" > 31 AND \"FLOORS\" <= 46"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1j9F3v9Z+BAsBEieZRA0YNGDVgMBkAAHdiAmUb0y6RAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "31 - 46 Floors"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"FLOORS\" > 46 AND \"FLOORS\" <= 62"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jnOG3+D8DBYCJEs2jBowaMGrAYDIAAIcNAqibTQYnAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "46 - 62 Floors"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"FLOORS\" > 62 AND \"FLOORS\" <= 78"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1j/F/P8J+BAsBEieZRA0YNGDVgMBkAAFt9Ap31nR6oAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "62 - 78 Floors"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"FLOORS\" > 78"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1j/P/f+D8DBYCJEs2jBowaMGrAYDIAADFBA1AuZh82AAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "> 78 Floors"
                                        ]
                                    }
                                ],
                                "Type": [
                                    "3"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "17000"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    }
                ],
                "Selectable": [
                    "true"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            },
            {
                "ActuallyVisible": [
                    "true"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "false"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "Default:FootpathGrades"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Samples/Melbourne/Data/FootpathGrades.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Melbourne/Layers/FootpathGrades.LayerDefinition"
                ],
                "LegendLabel": [
                    "Footpath Grades"
                ],
                "Name": [
                    "FootpathGrades"
                ],
                "ObjectId": [
                    "92c5fb9e-18a2-11ec-8008-0a002700000e"
                ],
                "ParentId": [
                    "92c58664-18a2-11ec-8004-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAADdJREFUOI1jFBER+a+pqclADrh+/ToDi6amJkNNTQ1ZBrS0tDAwkaUTCYwaMGrAqAEQwEhpdgYAIaEMEjLBgaMAAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": null
                                    }
                                ],
                                "Type": [
                                    "3"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "4500"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    }
                ],
                "Selectable": [
                    "false"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            },
            {
                "ActuallyVisible": [
                    "true"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "false"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "Default:Road Corridor"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Samples/Melbourne/Data/Road Corridor.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Melbourne/Layers/Road Corridor.LayerDefinition"
                ],
                "LegendLabel": [
                    "Road Corridor"
                ],
                "Name": [
                    "Road Corridor"
                ],
                "ObjectId": [
                    "92c5fb9e-18a2-11ec-8009-0a002700000e"
                ],
                "ParentId": [
                    "92c58664-18a2-11ec-8004-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": [
                                            "\"NAME\" = 'Arterial'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jbGg48J+BAsBEieZRA0YNGDVgMBkAAGXpAt+Cnx4gAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "Arterial"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"NAME\" = 'Citylink' OR \"NAME\" = 'Citylink2'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jZJ735z8DBYCJEs2jBowaMGrAYDIAANc3ArxlNu7KAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "Citylink"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"NAME\" = 'Council Major'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1j9PT0/M9AAWCiRPOoAaMGjBowmAwAAMVnAfrodOjIAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "Council Major"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"NAME\" = 'Council Minor'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jvHz58n8GCgATJZpHDRg1YNSAwWQAAFR0A5gSSyWyAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "Council Minor"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"NAME\" = 'Freeway'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jZGhg+M9AAWCiRPOoAaMGjBowmAwAAFReAZ96fsy0AAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "Freeway"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"NAME\" = 'Lease/Reserve'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jvLVU4T8DBYCJEs2jBowaMGrAYDIAAOEGAr69xsWmAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "Lease/Reserve"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"NAME\" = 'Parks Victoria'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jLM/k/M9AAWCiRPOoAaMGjBowmAwAAP6ZAgjvSuPKAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "Parks Victoria"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"NAME\" = 'Port Roads'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jZLh58z8DBYCJEs2jBowaMGrAYDIAACyMAtE7C+1ZAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "Port Roads"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"NAME\" = 'Private'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1j/M/A8J+BAsBEieZRA0YNGDVgMBkAAFhtAh6Zl924AAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "Private"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"NAME\" = 'Rail/Tram'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1j7GZg+M9AAWCiRPOoAaMGjBowmAwAAIGDAar4Kv31AAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "Rail/Tram"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"NAME\" = 'River'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jZHbb9p+BAsBEieZRA0YNGDVgMBkAAFa7Ah6J056jAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "River"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "\"NAME\" = 'Road Safety Act'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1j/P+f4T8DBYCJEs2jBowaMGrAYDIAAGKbAx3Dyee6AAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "Road Safety Act"
                                        ]
                                    }
                                ],
                                "Type": [
                                    "3"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "1000000000000"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    }
                ],
                "Selectable": [
                    "false"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            },
            {
                "ActuallyVisible": [
                    "true"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "false"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "Default:Property Boundaries"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Samples/Melbourne/Data/Property Boundaries.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Melbourne/Layers/Property Boundaries.LayerDefinition"
                ],
                "LegendLabel": [
                    "Property Boundaries"
                ],
                "Name": [
                    "Property Boundaries"
                ],
                "ObjectId": [
                    "92c5fb9e-18a2-11ec-800a-0a002700000e"
                ],
                "ParentId": [
                    "92c58664-18a2-11ec-8004-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAADdJREFUOI1j5BXm+i+jIcJADnhy4w0Di4yGCENIpR1ZBqxpP8TARJZOJDBqwKgBowZAACOl2RkAKOcLy+ohk9MAAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": null
                                    }
                                ],
                                "Type": [
                                    "3"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "1000000000000"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    }
                ],
                "Selectable": [
                    "false"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            },
            {
                "ActuallyVisible": [
                    "true"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "false"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "Default:Municipal Boundary"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Samples/Melbourne/Data/Municipal Boundary.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Melbourne/Layers/Municipal Boundary.LayerDefinition"
                ],
                "LegendLabel": [
                    "Municipal Boundary"
                ],
                "Name": [
                    "Municipal Boundary"
                ],
                "ObjectId": [
                    "92c5fb9e-18a2-11ec-800b-0a002700000e"
                ],
                "ParentId": [
                    "92c58664-18a2-11ec-8004-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jPD4r4j8DBYCJEs2jBowaMGrAYDIAAEo2Athzju8JAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": null
                                    }
                                ],
                                "Type": [
                                    "3"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "1000000000000"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    }
                ],
                "Selectable": [
                    "false"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            }
        ],
        "MapDefinition": [
            "Library://Samples/Melbourne/Maps/Melbourne.MapDefinition"
        ],
        "Name": [
            "Melbourne"
        ],
        "SessionId": [
            "92bd21f4-18a2-11ec-8000-0a002700000e_en_MTI3LjAuMC4x0B060B050B04"
        ],
        "SiteVersion": [
            "4.0.0.9862"
        ]
    }
};