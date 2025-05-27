"use client"

import { useState, useMemo, useEffect } from "react"
import {
  Search,
  Moon,
  Sun,
  Type,
  Filter,
  Download,
  Heart,
  Eye,
  Sparkles,
  Palette,
  Zap,
  ArrowLeft,
  Users,
  Target,
  Lightbulb,
  Copy,
  Check,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Enhanced font data with actual Google Fonts
const sampleFonts = [
  {
    name: "Roboto",
    category: "Sans Serif",
    styles: 12,
    preview: "The quick brown fox jumps over the lazy dog",
    popularity: 95,
    color: "from-blue-500 to-purple-600",
    description: "A modern, friendly sans-serif typeface",
    cssClass: "font-roboto",
    weights: ["100", "300", "400", "500", "700", "900"],
    googleFontUrl: "https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap",
  },
  {
    name: "Open Sans",
    category: "Sans Serif",
    styles: 10,
    preview: "Typography is the art of arranging letters",
    popularity: 92,
    color: "from-green-500 to-teal-600",
    description: "Optimized for print, web, and mobile interfaces",
    cssClass: "font-open-sans",
    weights: ["300", "400", "500", "600", "700", "800"],
    googleFontUrl: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap",
  },
  {
    name: "Lato",
    category: "Sans Serif",
    styles: 18,
    preview: "Design is not just what it looks like",
    popularity: 88,
    color: "from-orange-500 to-red-600",
    description: "Semi-rounded details give Lato a feeling of warmth",
    cssClass: "font-lato",
    weights: ["100", "300", "400", "700", "900"],
    googleFontUrl: "https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap",
  },
  {
    name: "Montserrat",
    category: "Sans Serif",
    styles: 9,
    preview: "Simplicity is the ultimate sophistication",
    popularity: 90,
    color: "from-pink-500 to-rose-600",
    description: "Inspired by the old posters and signs in Montserrat",
    cssClass: "font-montserrat",
    weights: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    googleFontUrl:
      "https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap",
  },
  {
    name: "Playfair Display",
    category: "Serif",
    styles: 6,
    preview: "Elegance is the only beauty that never fades",
    popularity: 85,
    color: "from-indigo-500 to-blue-600",
    description: "Transitional design with high contrast",
    cssClass: "font-playfair",
    weights: ["400", "500", "600", "700", "800", "900"],
    googleFontUrl:
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap",
  },
  {
    name: "Merriweather",
    category: "Serif",
    styles: 8,
    preview: "Good typography is invisible",
    popularity: 82,
    color: "from-emerald-500 to-green-600",
    description: "Designed to be a text face that is pleasant to read",
    cssClass: "font-merriweather",
    weights: ["300", "400", "700", "900"],
    googleFontUrl: "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap",
  },
  {
    name: "Crimson Text",
    category: "Serif",
    styles: 6,
    preview: "Classic elegance meets modern readability",
    popularity: 78,
    color: "from-red-500 to-pink-600",
    description: "Inspired by old-style serif fonts",
    cssClass: "font-crimson",
    weights: ["400", "600", "700"],
    googleFontUrl: "https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap",
  },
  {
    name: "Source Code Pro",
    category: "Monospace",
    styles: 7,
    preview: "console.log('Hello World!')",
    popularity: 87,
    color: "from-cyan-500 to-blue-600",
    description: "Designed for user interface and coding environments",
    cssClass: "font-source-code",
    weights: ["200", "300", "400", "500", "600", "700", "900"],
    googleFontUrl:
      "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@200;300;400;500;600;700;900&display=swap",
  },
  {
    name: "Fira Code",
    category: "Monospace",
    styles: 5,
    preview: "const design = () => creativity",
    popularity: 89,
    color: "from-violet-500 to-purple-600",
    description: "Monospaced font with programming ligatures",
    cssClass: "font-fira-code",
    weights: ["300", "400", "500", "600", "700"],
    googleFontUrl: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap",
  },
  {
    name: "JetBrains Mono",
    category: "Monospace",
    styles: 8,
    preview: "function() { return 'awesome'; }",
    popularity: 84,
    color: "from-slate-500 to-gray-600",
    description: "Typeface for developers with increased height",
    cssClass: "font-jetbrains",
    weights: ["100", "200", "300", "400", "500", "600", "700", "800"],
    googleFontUrl:
      "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;200;300;400;500;600;700;800&display=swap",
  },
  {
    name: "Dancing Script",
    category: "Handwriting",
    styles: 2,
    preview: "Life is beautiful",
    popularity: 78,
    color: "from-yellow-500 to-orange-600",
    description: "Lively casual script with bouncing letters",
    cssClass: "font-dancing",
    weights: ["400", "500", "600", "700"],
    googleFontUrl: "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap",
  },
  {
    name: "Pacifico",
    category: "Handwriting",
    styles: 1,
    preview: "Dream big, create bigger",
    popularity: 80,
    color: "from-red-500 to-pink-600",
    description: "Original and fun brush script",
    cssClass: "font-pacifico",
    weights: ["400"],
    googleFontUrl: "https://fonts.googleapis.com/css2?family=Pacifico&display=swap",
  },
  {
    name: "Great Vibes",
    category: "Handwriting",
    styles: 1,
    preview: "Elegant handwritten style",
    popularity: 75,
    color: "from-purple-500 to-pink-600",
    description: "Elegant script with beautiful connecting strokes",
    cssClass: "font-great-vibes",
    weights: ["400"],
    googleFontUrl: "https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap",
  },
  {
    name: "Bebas Neue",
    category: "Display",
    styles: 1,
    preview: "BOLD IMPACT HEADLINES",
    popularity: 88,
    color: "from-gray-600 to-slate-700",
    description: "All caps display font with strong impact",
    cssClass: "font-bebas",
    weights: ["400"],
    googleFontUrl: "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap",
  },
  {
    name: "Lobster",
    category: "Display",
    styles: 2,
    preview: "Retro Script Display",
    popularity: 82,
    color: "from-orange-600 to-red-600",
    description: "Bold script with vintage charm",
    cssClass: "font-lobster",
    weights: ["400"],
    googleFontUrl: "https://fonts.googleapis.com/css2?family=Lobster&display=swap",
  },
]

const categories = [
  {
    name: "All",
    icon: Sparkles,
    color: "from-purple-500 to-pink-500",
    description: "Browse all available fonts",
    count: sampleFonts.length,
  },
  {
    name: "Sans Serif",
    icon: Type,
    color: "from-blue-500 to-indigo-500",
    description: "Clean, modern fonts without decorative strokes",
    count: sampleFonts.filter((f) => f.category === "Sans Serif").length,
  },
  {
    name: "Serif",
    icon: Palette,
    color: "from-green-500 to-emerald-500",
    description: "Traditional fonts with decorative strokes",
    count: sampleFonts.filter((f) => f.category === "Serif").length,
  },
  {
    name: "Monospace",
    icon: Zap,
    color: "from-orange-500 to-red-500",
    description: "Fixed-width fonts perfect for coding",
    count: sampleFonts.filter((f) => f.category === "Monospace").length,
  },
  {
    name: "Handwriting",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    description: "Script and handwritten style fonts",
    count: sampleFonts.filter((f) => f.category === "Handwriting").length,
  },
  {
    name: "Display",
    icon: Eye,
    color: "from-indigo-500 to-purple-500",
    description: "Bold fonts designed for headlines and impact",
    count: sampleFonts.filter((f) => f.category === "Display").length,
  },
]

export default function TypeVerse() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [previewText, setPreviewText] = useState("The quick brown fox jumps over the lazy dog")
  const [fontSize, setFontSize] = useState([24])
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentPage, setCurrentPage] = useState<"home" | "categories" | "about">("home")
  const [selectedFont, setSelectedFont] = useState<(typeof sampleFonts)[0] | null>(null)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [copiedText, setCopiedText] = useState("")
  const { theme, setTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredFonts = useMemo(() => {
    return sampleFonts
      .filter((font) => {
        const matchesSearch = font.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "All" || font.category === selectedCategory
        return matchesSearch && matchesCategory
      })
      .sort((a, b) => b.popularity - a.popularity)
  }, [searchTerm, selectedCategory])

  const toggleFavorite = (fontName: string) => {
    setFavorites((prev) => (prev.includes(fontName) ? prev.filter((f) => f !== fontName) : [...prev, fontName]))
  }

  const navigateToPage = (page: "home" | "categories" | "about") => {
    setCurrentPage(page)
  }

  const openPreviewModal = (font: (typeof sampleFonts)[0]) => {
    setSelectedFont(font)
    setShowPreviewModal(true)
  }

  const openDownloadModal = (font: (typeof sampleFonts)[0]) => {
    setSelectedFont(font)
    setShowDownloadModal(true)
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(type)
      setTimeout(() => setCopiedText(""), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const generateCSSCode = (font: (typeof sampleFonts)[0]) => {
    return `/* Import the font */
@import url('${font.googleFontUrl}');

/* Use the font */
.my-text {
  font-family: ${font.fontFamily};
  font-weight: 400; /* Available weights: ${font.weights.join(", ")} */
}

/* Example usage */
h1 {
  font-family: ${font.fontFamily};
  font-weight: 700;
}

p {
  font-family: ${font.fontFamily};
  font-weight: 400;
}`
  }

  const generateHTMLCode = (font: (typeof sampleFonts)[0]) => {
    return `<!-- Add to your HTML head -->
<link href="${font.googleFontUrl}" rel="stylesheet">

<!-- Use in your HTML -->
<h1 style="font-family: ${font.fontFamily};">Your Heading</h1>
<p style="font-family: ${font.fontFamily};">Your paragraph text</p>`
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mb-4"></div>
          <p className="text-white text-xl">Loading TypeVerse...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Type className="h-8 w-8 md:h-10 md:w-10 text-white drop-shadow-lg" />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full blur-lg opacity-50"></div>
              </div>
              <h1
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-pink-200 to-violet-200 bg-clip-text text-transparent drop-shadow-lg cursor-pointer"
                onClick={() => navigateToPage("home")}
              >
                TypeVerse
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => navigateToPage("home")}
                className={`font-medium transition-all duration-300 hover:scale-105 ${
                  currentPage === "home" ? "text-white" : "text-white/90 hover:text-white"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => navigateToPage("categories")}
                className={`font-medium transition-all duration-300 hover:scale-105 ${
                  currentPage === "categories" ? "text-white" : "text-white/90 hover:text-white"
                }`}
              >
                Categories
              </button>
              <button
                onClick={() => navigateToPage("about")}
                className={`font-medium transition-all duration-300 hover:scale-105 ${
                  currentPage === "about" ? "text-white" : "text-white/90 hover:text-white"
                }`}
              >
                About
              </button>
            </nav>

            {/* Mobile & Desktop Actions */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-white hover:bg-white/20 transition-all duration-300"
              >
                <Sun className="h-4 w-4 md:h-5 md:w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 md:h-5 md:w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white hover:bg-white/20 transition-all duration-300"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/20 pt-4">
              <nav className="flex flex-col space-y-4">
                <button
                  onClick={() => {
                    navigateToPage("home")
                    setIsMobileMenuOpen(false)
                  }}
                  className={`text-left font-medium transition-all duration-300 py-2 px-4 rounded-lg ${
                    currentPage === "home"
                      ? "text-white bg-white/20"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    navigateToPage("categories")
                    setIsMobileMenuOpen(false)
                  }}
                  className={`text-left font-medium transition-all duration-300 py-2 px-4 rounded-lg ${
                    currentPage === "categories"
                      ? "text-white bg-white/20"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Categories
                </button>
                <button
                  onClick={() => {
                    navigateToPage("about")
                    setIsMobileMenuOpen(false)
                  }}
                  className={`text-left font-medium transition-all duration-300 py-2 px-4 rounded-lg ${
                    currentPage === "about"
                      ? "text-white bg-white/20"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  About
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Categories Page */}
      {currentPage === "categories" && (
        <div className="relative py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-pink-200 to-violet-200 bg-clip-text text-transparent">
                Font Categories
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Explore our carefully curated font categories. Each category serves different design purposes and moods.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <Card
                    key={category.name}
                    className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl rounded-2xl cursor-pointer"
                    onClick={() => {
                      setSelectedCategory(category.name)
                      navigateToPage("home")
                    }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                    ></div>

                    <CardContent className="relative p-8 text-center">
                      <div className="mb-6">
                        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${category.color} mb-4`}>
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                        <p className="text-white/70 text-sm mb-4">{category.description}</p>
                        <Badge className={`bg-gradient-to-r ${category.color} text-white border-0`}>
                          {category.count} fonts
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        {sampleFonts
                          .filter((font) => category.name === "All" || font.category === category.name)
                          .slice(0, 3)
                          .map((font, index) => (
                            <div key={index} className={`text-white/80 text-sm ${font.cssClass}`}>
                              {font.name}
                            </div>
                          ))}
                      </div>

                      <Button className="w-full mt-6 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 hover:bg-white/30 text-white border-0">
                        Explore {category.name}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* About Page */}
      {currentPage === "about" && (
        <div className="relative py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-pink-200 to-violet-200 bg-clip-text text-transparent">
                About TypeVerse
              </h2>
              <p className="text-xl text-white/80">
                Learn more about our mission, inspiration, and educational purpose.
              </p>
            </div>

            <div className="space-y-12">
              {/* Mission Section */}
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl mr-4">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                  </div>
                  <p className="text-white/80 leading-relaxed text-lg">
                    TypeVerse is an educational project designed to help developers and designers learn about web
                    typography, font selection, and modern web design principles. We provide an interactive platform to
                    explore, preview, and understand different font categories and their applications in web
                    development.
                  </p>
                </CardContent>
              </Card>

              {/* Inspiration Section */}
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl mr-4">
                      <Lightbulb className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Inspiration & Disclaimer</h3>
                  </div>
                  <div className="space-y-4 text-white/80 leading-relaxed text-lg">
                    <p>
                      <strong className="text-yellow-300">Important Notice:</strong> TypeVerse is inspired by Google
                      Fonts and serves as an educational clone for learning purposes only. This project does not
                      reflect, represent, or affiliate with Google Fonts or Google Inc. in any way.
                    </p>
                    <p>We created TypeVerse to demonstrate modern web development techniques, including:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>React and Next.js development patterns</li>
                      <li>Responsive design with Tailwind CSS</li>
                      <li>Interactive UI components and state management</li>
                      <li>Modern design principles and animations</li>
                      <li>Font preview and comparison functionality</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Educational Purpose Section */}
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-3 rounded-xl mr-4">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Educational Purpose</h3>
                  </div>
                  <div className="space-y-4 text-white/80 leading-relaxed text-lg">
                    <p>This project is created solely for educational and learning purposes. It demonstrates:</p>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div className="space-y-3">
                        <h4 className="text-white font-semibold">Technical Skills:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Modern React development</li>
                          <li>TypeScript implementation</li>
                          <li>Responsive design patterns</li>
                          <li>Component architecture</li>
                          <li>State management</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-white font-semibold">Design Concepts:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Typography principles</li>
                          <li>Color theory application</li>
                          <li>User interface design</li>
                          <li>Animation and transitions</li>
                          <li>Accessibility considerations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Legal Notice */}
              <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-md border border-red-300/30 rounded-2xl p-6">
                <h4 className="text-white font-bold mb-3 flex items-center">
                  <span className="text-red-300 mr-2">⚠️</span>
                  Legal Notice
                </h4>
                <p className="text-white/90 text-sm leading-relaxed">
                  All font names, trademarks, and references used in this project are for educational demonstration
                  only. Google Fonts is a trademark of Google Inc. This project is not endorsed by, affiliated with, or
                  sponsored by Google. If you are looking for the official Google Fonts service, please visit
                  <span className="text-blue-300"> fonts.google.com</span>.
                </p>
              </div>

              {/* Back to Home Button */}
              <div className="text-center pt-8">
                <Button
                  onClick={() => navigateToPage("home")}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 px-8 py-3 text-lg font-semibold rounded-2xl"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Home Page Content */}
      {currentPage === "home" && (
        <>
          {/* Hero Section */}
          <section className="relative py-12 md:py-20 overflow-hidden">
            <div className="container mx-auto px-4 text-center relative z-10">
              <div className="mb-6 md:mb-8">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-pink-200 to-violet-200 bg-clip-text text-transparent drop-shadow-2xl">
                  Explore & Preview
                </h2>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Web Fonts
                </h3>
              </div>

              <p className="text-lg md:text-xl text-white/80 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
                Discover the perfect typography for your next project. Preview, compare, and find fonts that bring your
                designs to life with our interactive font explorer.
              </p>

              {/* Enhanced Search Bar */}
              <div className="relative max-w-2xl mx-auto mb-6 md:mb-8 px-4">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl blur opacity-75"></div>
                <div className="relative bg-white/20 backdrop-blur-md rounded-2xl p-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4 md:h-5 md:w-5" />
                    <Input
                      type="text"
                      placeholder="Search fonts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 md:pl-12 h-12 md:h-14 text-base md:text-lg bg-transparent border-0 text-white placeholder:text-white/60 focus:ring-2 focus:ring-white/30"
                    />
                  </div>
                </div>
              </div>

              {/* Live Preview Input */}
              <div className="max-w-3xl mx-auto mb-6 md:mb-8 px-4">
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-1">
                  <Input
                    type="text"
                    placeholder="Type to preview fonts..."
                    value={previewText}
                    onChange={(e) => setPreviewText(e.target.value)}
                    className="h-12 md:h-14 text-center text-base md:text-lg bg-transparent border-0 text-white placeholder:text-white/60"
                  />
                </div>
              </div>

              {/* Font Size Slider */}
              <div className="max-w-md mx-auto px-4">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6">
                  <label className="block text-white/90 text-sm font-medium mb-3">Font Size: {fontSize[0]}px</label>
                  <Slider value={fontSize} onValueChange={setFontSize} max={72} min={12} step={2} className="w-full" />
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Filters */}
          <section className="relative py-6 md:py-8">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <Filter className="h-4 w-4 md:h-5 md:w-5 text-white/70" />
                <span className="text-white/90 font-medium text-sm md:text-base">Categories:</span>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {categories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <Button
                      key={category.name}
                      variant={selectedCategory === category.name ? "default" : "outline"}
                      size={window.innerWidth < 768 ? "sm" : "lg"}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`
              relative overflow-hidden rounded-xl md:rounded-2xl border-2 transition-all duration-300 hover:scale-105 text-xs md:text-sm
              ${
                selectedCategory === category.name
                  ? `bg-gradient-to-r ${category.color} text-white border-white/30 shadow-2xl`
                  : "bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20"
              }
            `}
                    >
                      <IconComponent className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      <span className="hidden sm:inline">{category.name}</span>
                      <span className="sm:hidden">{category.name.split(" ")[0]}</span>
                      {selectedCategory === category.name && (
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      )}
                    </Button>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Enhanced Font Grid */}
          <main className="relative py-8">
            <div className="container mx-auto px-4">
              <div className="mb-8 flex items-center justify-between">
                <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2">
                  <p className="text-white/90">
                    <span className="font-bold text-yellow-400">{filteredFonts.length}</span> font
                    {filteredFonts.length !== 1 ? "s" : ""}
                    {selectedCategory !== "All" && <span className="text-pink-300"> in {selectedCategory}</span>}
                    {searchTerm && <span className="text-cyan-300"> matching "{searchTerm}"</span>}
                  </p>
                </div>

                <div className="text-white/70 text-sm">💡 Click the heart to favorite fonts</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {filteredFonts.map((font, index) => (
                  <Card
                    key={index}
                    className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl rounded-2xl"
                  >
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${font.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                    ></div>

                    <CardContent className="relative p-4 md:p-8">
                      <div className="mb-4 md:mb-6">
                        <div className="flex items-center justify-between mb-2 md:mb-3">
                          <h3 className="font-bold text-lg md:text-xl text-white group-hover:text-yellow-300 transition-colors">
                            {font.name}
                          </h3>
                          <div className="flex items-center gap-1 md:gap-2">
                            <Badge
                              variant="secondary"
                              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-xs font-bold"
                            >
                              {font.styles} style{font.styles !== 1 ? "s" : ""}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleFavorite(font.name)}
                              className="h-6 w-6 md:h-8 md:w-8 text-white hover:bg-white/20"
                            >
                              <Heart
                                className={`h-3 w-3 md:h-4 md:w-4 transition-all duration-300 ${
                                  favorites.includes(font.name)
                                    ? "fill-red-500 text-red-500 scale-110"
                                    : "hover:text-red-400"
                                }`}
                              />
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-white/70 text-xs md:text-sm font-medium">{font.category}</p>
                          <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-green-400 text-xs font-bold">{font.popularity}% popular</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 md:space-y-4">
                        <div
                          className={`text-white leading-relaxed transition-all duration-300 group-hover:text-yellow-100 ${font.cssClass}`}
                          style={{
                            fontSize: `${Math.max(fontSize[0] * 0.8, 16)}px`,
                          }}
                        >
                          {previewText}
                        </div>

                        <div className="text-xs md:text-sm text-white/60 border-t border-white/20 pt-3 md:pt-4 space-y-1 md:space-y-2">
                          <div className={`font-medium ${font.cssClass}`}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                          <div className={font.cssClass}>abcdefghijklmnopqrstuvwxyz</div>
                          <div className={font.cssClass}>0123456789 !@#$%^&*()</div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4 md:mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Button
                          size="sm"
                          onClick={() => openPreviewModal(font)}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 font-bold text-xs md:text-sm"
                        >
                          <Eye className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => openDownloadModal(font)}
                          variant="outline"
                          className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                        >
                          <Download className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredFonts.length === 0 && (
                <div className="text-center py-20">
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 max-w-md mx-auto">
                    <Type className="h-16 w-16 text-white/50 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">No fonts found</h3>
                    <p className="text-white/70">Try adjusting your search or filter criteria</p>
                  </div>
                </div>
              )}
            </div>
          </main>
        </>
      )}

      {/* Preview Modal */}
      <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
        <DialogContent className="max-w-4xl bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-md border border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
              {selectedFont?.name} Preview
            </DialogTitle>
          </DialogHeader>

          {selectedFont && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-white/70 text-sm mb-2">Category: {selectedFont.category}</p>
                  <p className="text-white/70 text-sm mb-2">Styles: {selectedFont.styles}</p>
                  <p className="text-white/70 text-sm">{selectedFont.description}</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-2">Popularity: {selectedFont.popularity}%</p>
                  <p className="text-white/70 text-sm">Available weights: {selectedFont.weights.join(", ")}</p>
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                  placeholder="Type your custom text..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />

                <div className="space-y-4">
                  {selectedFont.weights.map((weight) => (
                    <div key={weight} className="bg-white/5 rounded-lg p-4">
                      <p className="text-white/60 text-sm mb-2">Weight: {weight}</p>
                      <div
                        className={`text-white text-2xl ${selectedFont.cssClass}`}
                        style={{
                          fontWeight: weight,
                        }}
                      >
                        {previewText}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Download Modal */}
      <Dialog open={showDownloadModal} onOpenChange={setShowDownloadModal}>
        <DialogContent className="max-w-4xl bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-md border border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
              Download {selectedFont?.name}
            </DialogTitle>
          </DialogHeader>

          {selectedFont && (
            <Tabs defaultValue="css" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10">
                <TabsTrigger value="css" className="text-white data-[state=active]:bg-white/20">
                  CSS
                </TabsTrigger>
                <TabsTrigger value="html" className="text-white data-[state=active]:bg-white/20">
                  HTML
                </TabsTrigger>
              </TabsList>

              <TabsContent value="css" className="space-y-4">
                <div className="bg-black/30 rounded-lg p-4 relative">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(generateCSSCode(selectedFont), "css")}
                    className="absolute top-2 right-2 text-white hover:bg-white/20"
                  >
                    {copiedText === "css" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <pre className="text-sm text-white/90 overflow-x-auto">
                    <code>{generateCSSCode(selectedFont)}</code>
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="html" className="space-y-4">
                <div className="bg-black/30 rounded-lg p-4 relative">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(generateHTMLCode(selectedFont), "html")}
                    className="absolute top-2 right-2 text-white hover:bg-white/20"
                  >
                    {copiedText === "html" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <pre className="text-sm text-white/90 overflow-x-auto">
                    <code>{generateHTMLCode(selectedFont)}</code>
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Enhanced Footer */}
      <footer className="relative mt-20 bg-black/30 backdrop-blur-md border-t border-white/20">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <Type className="h-8 w-8 text-white" />
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
                  TypeVerse
                </span>
              </div>
              <p className="text-white/70 mb-6 leading-relaxed">
                Discover, preview, and explore beautiful web fonts for your creative projects. Powered by creativity and
                designed for developers who love beautiful typography.
              </p>
              <div className="flex gap-4">
                <div className="bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg p-3">
                  <span className="text-white font-bold text-sm">🎨 Creative</span>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-3">
                  <span className="text-white font-bold text-sm">⚡ Fast</span>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-3">
                  <span className="text-white font-bold text-sm">🚀 Modern</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Resources</h4>
              <ul className="space-y-3">
                {["Font Pairing", "Typography Guide", "Web Performance", "Design Tips"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Community</h4>
              <ul className="space-y-3">
                {["GitHub", "Discord", "Twitter", "Newsletter"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8 text-center">
            <p className="text-white/60 mb-2">
              © 2024 TypeVerse. Educational project for learning purposes. Made with 💜 for developers.
            </p>
            <p className="text-white/50 text-sm">
              Inspired by Google Fonts • Not affiliated with Google Inc. • For educational use only
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
