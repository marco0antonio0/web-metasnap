"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Camera, Download, RotateCcw, ExternalLink, Code2, Copy, Check } from "lucide-react"
import Image from "next/image"

type AppState = "welcome" | "loading" | "result" | "error"

export default function MetaSnapGenerator() {
  const [state, setState] = useState<AppState>("welcome")
  const [url, setUrl] = useState("")
  const [thumbnailUrl, setThumbnailUrl] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const validateUrl = (inputUrl: string): boolean => {
    try {
      const urlObj = new URL(inputUrl)
      return urlObj.protocol === "https:" || urlObj.protocol === "http:"
    } catch {
      return false
    }
  }

  const generateThumbnail = async () => {
    if (!url.trim()) {
      setError("Por favor, insira uma URL válida")
      return
    }

    let formattedUrl = url.trim()
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://" + formattedUrl
    }

    if (!validateUrl(formattedUrl)) {
      setError("Por favor, insira uma URL válida")
      return
    }

    setState("loading")
    setError("")

    try {
      // Simular loading de 3 segundos
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const encodedUrl = encodeURIComponent(formattedUrl)
      const apiUrl = `https://metasnap.dirrocha.com/screenshot?url=${encodedUrl}&refresh=true`

      const response = await fetch(apiUrl, {
        headers: {
          accept: "image/jpeg",
        },
      })

      if (!response.ok) {
        throw new Error("Erro ao gerar thumbnail")
      }

      const blob = await response.blob()
      const imageUrl = URL.createObjectURL(blob)
      setThumbnailUrl(imageUrl)
      setState("result")
    } catch (err) {
      setError("Erro ao gerar thumbnail. Tente novamente.")
      setState("error")
    }
  }

  const resetApp = () => {
    setState("welcome")
    setUrl("")
    setThumbnailUrl("")
    setError("")
    if (thumbnailUrl) {
      URL.revokeObjectURL(thumbnailUrl)
    }
  }

  const downloadThumbnail = () => {
    if (thumbnailUrl) {
      const link = document.createElement("a")
      link.href = thumbnailUrl
      link.download = `metasnap-thumbnail-${new Date().getTime()}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const exampleCode = `<Head>
  <title>Meu Site Incrível</title>
  <meta name="description" content="Descrição do meu site" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:title" content="Meu Site Incrível" />
  <meta property="og:description" content="Descrição do meu site" />
  <meta property="og:image" content="https://metasnap.dirrocha.com/screenshot?url=https%3A%2F%2Fmeusite.com" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://meusite.com/" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Meu Site Incrível" />
  <meta name="twitter:description" content="Descrição do meu site" />
  <meta name="twitter:image" content="https://metasnap.dirrocha.com/screenshot?url=https%3A%2F%2Fmeusite.com" />
</Head>`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(exampleCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Erro ao copiar:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="relative">
                <Camera className="h-8 w-8 sm:h-12 sm:w-12 text-purple-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                MetaSnap
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
              Gere thumbnails profissionais de qualquer site para suas meta tags e redes sociais
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4 sm:mt-6">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium">
                Open Graph
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
                Twitter Cards
              </span>
              <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs sm:text-sm font-medium">
                SEO Otimizado
              </span>
            </div>
          </div>

          {/* Welcome State */}
          {state === "welcome" && (
            <div className="space-y-6 sm:space-y-8">
              <Card className="w-full max-w-2xl mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-4 sm:pb-6">
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Bem-vindos ao MetaSnap! 🚀
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base md:text-lg text-gray-600">
                    Insira a URL do site para gerar uma thumbnail profissional
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                  <div className="space-y-2 sm:space-y-3">
                    <label
                      htmlFor="url-input"
                      className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300"
                    >
                      URL do Site
                    </label>
                    <Input
                      id="url-input"
                      type="url"
                      placeholder="https://exemplo.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="text-sm sm:text-base h-12 sm:h-14 border-2 focus:border-purple-500 transition-colors"
                      onKeyPress={(e) => e.key === "Enter" && generateThumbnail()}
                    />
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Formato: https://seusite.com ou apenas seusite.com
                    </p>
                  </div>
                  {error && (
                    <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm sm:text-base">{error}</p>
                    </div>
                  )}
                  <Button
                    onClick={generateThumbnail}
                    className="w-full text-sm sm:text-base py-4 sm:py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                    size="lg"
                  >
                    <Camera className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Gerar Thumbnail
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Loading State */}
          {state === "loading" && (
            <Card className="w-full max-w-2xl mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="py-8 sm:py-12 p-4 sm:p-6">
                <div className="text-center space-y-4 sm:space-y-6">
                  <div className="flex justify-center">
                    <div className="relative">
                      <Loader2 className="h-12 w-12 sm:h-16 sm:w-16 animate-spin text-purple-600" />
                      <div className="absolute inset-0 rounded-full border-4 border-purple-200 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      Gerando thumbnail...
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      Aguarde enquanto capturamos a imagem do site
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 dark:bg-gray-700 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-full rounded-full animate-pulse transition-all duration-1000"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Result State */}
          {state === "result" && (
            <div className="space-y-6 sm:space-y-8">
              <Card className="w-full shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-4 sm:pb-6">
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    ✨ Thumbnail Gerada com Sucesso!
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">Sua thumbnail está pronta para uso</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                  <div className="flex justify-center">
                    <div className="relative max-w-full rounded-xl overflow-hidden shadow-2xl bg-white p-2">
                      <Image
                        src={thumbnailUrl || "/placeholder.svg"}
                        alt="Thumbnail gerada"
                        width={800}
                        height={600}
                        className="max-w-full h-auto rounded-lg"
                        style={{ maxHeight: "400px", objectFit: "contain" }}
                        priority
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <Button
                      onClick={downloadThumbnail}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-sm sm:text-base py-3 sm:py-4 px-6 sm:px-8 transition-all duration-300 transform hover:scale-105"
                      size="lg"
                    >
                      <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Download
                    </Button>
                    <Button
                      onClick={resetApp}
                      variant="outline"
                      className="border-2 border-purple-200 hover:border-purple-400 text-sm sm:text-base py-3 sm:py-4 px-6 sm:px-8 transition-all duration-300 transform hover:scale-105 bg-transparent"
                      size="lg"
                    >
                      <RotateCcw className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Gerar Outra Thumbnail
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Error State */}
          {state === "error" && (
            <Card className="w-full max-w-2xl mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="py-6 sm:py-8 p-4 sm:p-6">
                <div className="text-center space-y-4 sm:space-y-6">
                  <div className="text-red-500">
                    <Camera className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-red-600">Ops! Algo deu errado</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{error}</p>
                  <Button
                    onClick={resetApp}
                    variant="outline"
                    className="border-2 border-red-200 hover:border-red-400 text-sm sm:text-base py-3 sm:py-4 px-6 sm:px-8 transition-all duration-300 transform hover:scale-105 bg-transparent"
                    size="lg"
                  >
                    <RotateCcw className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Tentar Novamente
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Example Usage Section */}
          <Card className="mt-8 sm:mt-12 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl">
                <Code2 className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Como usar no seu site
                </span>
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Exemplo de como implementar o MetaSnap nas suas meta tags
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
                  <code>{exampleCode}</code>
                </pre>
                <Button
                  onClick={copyToClipboard}
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 hover:bg-white text-xs sm:text-sm"
                >
                  {copied ? (
                    <>
                      <Check className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                      Copiar
                    </>
                  )}
                </Button>
              </div>
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs sm:text-sm text-blue-800">
                  <strong>💡 Dica:</strong> Substitua "https://meusite.com" pela URL do seu site. O MetaSnap irá gerar
                  automaticamente uma thumbnail atualizada para suas redes sociais!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* API Info */}
          <Card className="mt-6 sm:mt-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl">
                <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-600" />
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  API Disponível
                </span>
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Integre nossa API de thumbnails em seus projetos
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
                Nossa API permite gerar thumbnails programaticamente. Acesse a documentação completa e teste todos os
                endpoints disponíveis:
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  variant="outline"
                  asChild
                  className="border-2 border-cyan-200 hover:border-cyan-400 text-sm sm:text-base py-3 sm:py-4 px-4 sm:px-6 transition-all duration-300 transform hover:scale-105 bg-transparent"
                >
                  <a
                    href="https://metasnap.dirrocha.com/api"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Documentação da API (Swagger)
                  </a>
                </Button>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  API Online e Funcionando
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8 sm:mt-12 py-6 sm:py-8">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Feito com ❤️ pela equipe MetaSnap •
              <a href="https://web-metasnap.dirrocha.com" className="text-purple-600 hover:text-purple-700 ml-1">
                web-metasnap.dirrocha.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
