# Haru Web Builder

AI-powered web development pipeline that analyzes websites and generates production-ready code.

## 🎯 Overview

Haru Web Builder is an intelligent system that combines AI analysis with the Model Context Protocol (MCP) to explore, understand, and recreate websites with pixel-perfect accuracy.

**Key Features:**
- 🔍 **Comprehensive Web Analysis** - 21-checkpoint progressive scrolling for complete coverage
- 🎨 **Design System Extraction** - Automatic design token generation
- 💻 **Code Generation** - Production-ready HTML/CSS with Tailwind v4
- 🤖 **MCP Integration** - Kapture MCP for real browser interaction
- 📱 **Responsive Design** - Multi-viewport analysis (mobile, tablet, desktop)

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- VS Code with GitHub Copilot
- Kapture MCP extension (for web exploration)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/haru-web-builder.git
cd haru-web-builder

# Install dependencies
npm install
```

### Configuration

The project uses MCP (Model Context Protocol) for web exploration. Configuration is in `.vscode/mcp.json`.

## 📖 Usage

### Basic Web Analysis

```bash
# In VS Code with Copilot Chat
/web https://example.com
```

This will:
1. Analyze the website structure (content)
2. Extract design system (style)
3. Generate integrated specification
4. Create production-ready code

### Step-by-Step Approach

```bash
# 1. Content analysis
/contents https://example.com

# 2. Style analysis
/style https://example.com

# 3. Integration
/integrate

# 4. Generate code (Tailwind single-page)
/generate
```

## 📁 Project Structure

```
haru-web-builder/
├── .github/
│   └── copilot-instructions.md    # AI behavior rules
├── .vscode/
│   └── mcp.json                   # MCP configuration
├── analysis/
│   └── web-pipeline/
│       ├── 01_contents_web.json   # Content analysis output
│       ├── 02_style_web.json      # Style analysis output
│       ├── 03_integrate_web.json  # Integrated specification
│       └── generators/
│           └── 04_generate_tailwind.json
├── output/
│   ├── web_contents.json          # Public content spec
│   ├── web_style.json             # Public style spec
│   ├── WebDevSpec.json            # Public integration spec
│   └── web/
│       └── index.html             # Generated code
├── docs/
└── scripts/
```

## 🎨 Features

### Progressive 5% Scroll Analysis

The system uses a **21-checkpoint scrolling protocol** (0%, 5%, 10%...100%) to ensure complete coverage:

- Captures every visual change
- Detects all scroll animations (fade-in, parallax, etc.)
- Tests interactive elements at each checkpoint
- Documents state changes systematically

### Design Token Extraction

Automatically extracts:
- Color system (primary, secondary, accent, neutrals)
- Typography (font families, sizes, weights, line heights)
- Spacing system (margins, padding, gaps)
- Component patterns (buttons, cards, forms)
- Animation timings and easings

### Code Generation Options

**Tailwind Single-Page (Default)**
- Single HTML file with Tailwind v4 CDN
- Utility-first approach
- Fast prototyping
- Easy maintenance

## 🛠️ Commands

| Command | Description |
|---------|-------------|
| `/web [url]` | Complete pipeline: analysis → code |
| `/contents [url]` | Content structure analysis only |
| `/style [url]` | Design system extraction only |
| `/integrate` | Merge content + style |
| `/generate` | Generate code from specs |

## 📋 Analysis Quality Checklist

**Content Analysis (01_contents_web.json)**
- [ ] Complete page structure
- [ ] Navigation hierarchy
- [ ] SEO metadata
- [ ] Interactive elements documented
- [ ] Accessibility requirements

**Style Analysis (02_style_web.json)**
- [ ] Color system with states
- [ ] Responsive typography
- [ ] Spacing system
- [ ] Component patterns
- [ ] Animation specifications
- [ ] 21-checkpoint scroll coverage

**Integration (03_integrate_web.json)**
- [ ] Content + style merged
- [ ] No hard-coded values
- [ ] All states documented
- [ ] Responsive behavior defined
- [ ] Accessibility mapped

**Code Generation**
- [ ] Production-ready code
- [ ] WCAG 2.1 AA compliance
- [ ] SEO optimized
- [ ] All animations implemented
- [ ] No placeholder content (except images)

## 🔒 Core Principles

### 1. MCP Tool Policy
- ✅ Use Kapture MCP exclusively (`mcp_kapture_*`)
- ❌ No Microsoft Playwright MCP
- ❌ No generic browser MCP

### 2. Screenshot Policy
- Take via MCP → Analyze immediately
- No file saving (memory-based analysis)
- Compare with conversation history

### 3. No Shortcuts
- Complete 21-checkpoint process mandatory
- No "End" key jumps
- No "fast analysis"
- Systematic approach required

## 🤖 AI Integration

This project is designed to work with **GitHub Copilot** using detailed instructions in `.github/copilot-instructions.md`.

The AI follows strict protocols:
- 21-checkpoint progressive scrolling
- Mandatory interaction testing
- Complete feature implementation
- No simplification of complex features

## 🎯 Use Cases

- **Website Replication** - Recreate existing sites
- **Design System Documentation** - Extract design tokens
- **Prototype Generation** - Quick mockups from reference
- **Accessibility Audit** - Analyze WCAG compliance
- **Responsive Analysis** - Multi-viewport testing

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines first.

## 📞 Support

- Issues: [GitHub Issues](https://github.com/YOUR_USERNAME/haru-web-builder/issues)
- Discussions: [GitHub Discussions](https://github.com/YOUR_USERNAME/haru-web-builder/discussions)

## 🙏 Acknowledgments

- Built with [GitHub Copilot](https://github.com/features/copilot)
- Uses [Kapture MCP](https://github.com/microsoft/mcp) for web exploration
- Powered by [Tailwind CSS v4](https://tailwindcss.com/)

---

**Version:** 2.1.0  
**Last Updated:** November 11, 2025
