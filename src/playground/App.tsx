import React, { useState } from 'react';
import {
  Button,
  Input,
  Badge,
  Avatar,
  Spinner,
  Checkbox,
  Heading,
  Text,
  Icon,
  IconLanguageId,
  IconLanguageEn,
  IconMathSqrt,
} from '../atoms';
import {
  FormField,
  SearchBar,
  Alert,
  Modal,
  Tabs,
} from '../molecules';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  StatCard,
  Navbar,
  Sidebar,
  DataTable,
  type Column,
} from '../organisms';
import {
  IconAtom,
  IconComponents,
  IconLayout,
  IconCode,
  IconCopy,
  IconCheck,
  IconUsers,
  IconSchool,
  IconTrendingUp,
  IconSettings,
  IconPlus,
  IconSend,
  IconTrash,
  IconSparkles,
  IconSearch,
  IconHeart,
  IconMessageCircle,
  IconBell,
  IconFileText,
  IconCalendar,
  IconChartBar,
  IconSun,
  IconMoon,
  IconPalette,
  IconLayersSubtract,
  IconBorderAll,
  IconShadow,
  IconTypography,
  IconRuler2,
  IconClick,
  IconForms,
  IconIdBadge,
  IconUser,
  IconLoader,
  IconCheckbox,
  IconAlertCircle,
  IconWindow,
  IconMenu2,
  IconX,
} from '@tabler/icons-react';
import { units } from '../tokens/units';
import { primitiveColors } from '../tokens/colors';

interface StudentData {
  id: string;
  name: string;
  nisn: string;
  class: string;
  status: 'active' | 'graduated' | 'pending';
  gpa: number;
}

const mockStudents: StudentData[] = [
  { id: '1', name: 'Ahmad Fauzi', nisn: '0051283921', class: 'XII IPA 1', status: 'active', gpa: 3.85 },
  { id: '2', name: 'Siti Rahmawati', nisn: '0058291032', class: 'XII IPA 2', status: 'active', gpa: 3.92 },
  { id: '3', name: 'Budi Santoso', nisn: '0049281729', class: 'XII IPS 1', status: 'graduated', gpa: 3.65 },
  { id: '4', name: 'Dewi Lestari', nisn: '0057192834', class: 'XI IPA 3', status: 'pending', gpa: 3.40 },
  { id: '5', name: 'Rizky Pratama', nisn: '0053918274', class: 'X-B', status: 'active', gpa: 3.78 },
];

export default function App() {
  const [selectedId, setSelectedId] = useState('button');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mainRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [selectedId]);

  // Component test states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  const [tablePage, setTablePage] = useState(1);
  const [sidebarDemoCollapsed, setSidebarDemoCollapsed] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [activeTabDemo, setActiveTabDemo] = useState('tab1');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const copySnippet = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const studentColumns: Column<StudentData>[] = [
    {
      key: 'name',
      header: 'Nama Siswa',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={row.name} size="sm" />
          <div>
            <div className="font-semibold text-slate-800 dark:text-slate-200">{row.name}</div>
            <div className="text-[11px] text-slate-400">NISN: {row.nisn}</div>
          </div>
        </div>
      ),
    },
    { key: 'class', header: 'Kelas' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => {
        const map = {
          active: <Badge variant="success" dot appearance="subtle">Aktif</Badge>,
          graduated: <Badge variant="primary" appearance="subtle">Lulus</Badge>,
          pending: <Badge variant="warning" dot appearance="subtle">Menunggu</Badge>,
        };
        return map[row.status];
      },
    },
    {
      key: 'gpa',
      header: 'IPK / Rata-rata',
      align: 'right',
      render: (row) => <span className="font-bold text-slate-800 dark:text-slate-200">{row.gpa.toFixed(2)}</span>,
    },
  ];

  const sidebarNavGroups = [
    {
      title: 'Tokens & Foundations',
      items: [
        { id: 'palettes', label: 'Primitive Palettes', icon: IconPalette, badge: '7 Palet' },
        { id: 'text-semantics', label: 'Text Semantics', icon: IconTypography, badge: '16 Warna' },
        { id: 'bg-surface-semantics', label: 'Background & Surface', icon: IconLayersSubtract },
        { id: 'layer-elevation', label: 'Layer & Elevation', icon: IconShadow },
        { id: 'icon-border-semantics', label: 'Icon & Border', icon: IconBorderAll },
        { id: 'typography-scale', label: 'Typography v3.1', icon: IconTypography, badge: 'Lexend' },
        { id: 'unit-scale', label: 'Unit Scale v3.1', icon: IconRuler2, badge: 'px/rem' },
      ],
    },
    {
      title: 'Atoms',
      items: [
        { id: 'button', label: 'Button', icon: IconClick },
        { id: 'icon', label: 'Icon (Tabler)', icon: IconSparkles },
        { id: 'input', label: 'Input', icon: IconForms },
        { id: 'badge', label: 'Badge', icon: IconIdBadge },
        { id: 'avatar', label: 'Avatar', icon: IconUser },
        { id: 'checkbox', label: 'Checkbox', icon: IconCheckbox },
        { id: 'spinner', label: 'Spinner', icon: IconLoader },
      ],
    },
    {
      title: 'Molecules',
      items: [
        { id: 'form-field', label: 'FormField', icon: IconForms },
        { id: 'search-bar', label: 'SearchBar', icon: IconSearch },
        { id: 'alert', label: 'Alert', icon: IconAlertCircle },
        { id: 'modal', label: 'Modal', icon: IconWindow },
        { id: 'tabs', label: 'Tabs', icon: IconComponents },
      ],
    },
    {
      title: 'Organisms',
      items: [
        { id: 'navbar', label: 'Navbar', icon: IconLayout },
        { id: 'sidebar', label: 'Sidebar', icon: IconLayout },
        { id: 'stat-card', label: 'StatCard', icon: IconTrendingUp },
        { id: 'data-table', label: 'DataTable', icon: IconCalendar },
        { id: 'card', label: 'Card', icon: IconComponents },
      ],
    },
    {
      title: 'Panduan',
      items: [
        { id: 'microservices', label: 'Integrasi Microservices', icon: IconCode },
      ],
    },
  ];

  const paletteCards = [
    { name: 'Green Palette', key: 'green', color: primitiveColors.green },
    { name: 'Cyan Palette', key: 'cyan', color: primitiveColors.cyan },
    { name: 'Rose Palette', key: 'rose', color: primitiveColors.rose },
    { name: 'Amber Palette', key: 'amber', color: primitiveColors.amber },
    { name: 'Blue Palette', key: 'blue', color: primitiveColors.blue },
    { name: 'Violet Palette', key: 'violet', color: primitiveColors.violet },
    { name: 'Slate Palette', key: 'slate', color: primitiveColors.slate },
  ];

  const semanticTextRows = [
    { name: 'text-disabled', value: 'Slate 100-alpha-24', light: 'rgba(15, 23, 42, 0.24)', dark: 'rgba(255, 255, 255, 0.24)' },
    { name: 'text-error', value: 'Rose 60', light: '#E6212A', dark: '#E6212A' },
    { name: 'text-error-hover', value: 'Rose 70', light: '#B81A22', dark: '#B81A22' },
    { name: 'text-helper', value: 'Slate 60', light: '#64748B', dark: '#64748B' },
    { name: 'text-interactive', value: 'Light: Blue 60 • Dark: Blue 50', light: '#0F62FE', dark: '#4589FF' },
    { name: 'text-interactive-hover', value: 'Light: Blue 70 • Dark: Blue 50', light: '#0043CE', dark: '#4589FF' },
    { name: 'text-inverse', value: 'White', light: '#FFFFFF', dark: '#FFFFFF' },
    { name: 'text-on-color', value: 'White', light: '#FFFFFF', dark: '#FFFFFF' },
    { name: 'text-on-color-disabled', value: 'Light: Slate 50 • Dark: Slate 60', light: '#94A3B8', dark: '#64748B' },
    { name: 'text-placeholder', value: 'Light: Slate 50 • Dark: Slate 70', light: '#94A3B8', dark: '#475569' },
    { name: 'text-primary', value: 'Light: Slate 100 • Dark: White', light: '#0F172A', dark: '#FFFFFF' },
    { name: 'text-secondary', value: 'Light: Slate 70 • Dark: Slate 30', light: '#475569', dark: '#E2E8F0' },
    { name: 'text-tertiary-amber', value: 'Light: Amber 80 • Dark: Amber 40', light: '#B45309', dark: '#FCD34D' },
    { name: 'text-tertiary-cyan', value: 'Light: Cyan 80 • Dark: Cyan 40', light: '#0E7490', dark: '#67E8F9' },
    { name: 'text-tertiary-green', value: 'Light: Green 80 • Dark: Green 40', light: '#15803D', dark: '#86EFAC' },
    { name: 'text-tertiary-violet', value: 'Light: Violet 70 • Dark: Violet 40', light: '#9333EA', dark: '#D8B4FE' },
  ];

  const backgroundRows = [
    { name: 'background-default', desc: 'Warna dasar utama (root) untuk canvas atau halaman aplikasi.', light: '#FFFFFF', dark: '#0F172A', val: 'Light: white • Dark: Slate 100' },
    { name: 'background-subtle', desc: 'Warna latar sekunder untuk area halaman yang butuh sedikit kontras dari latar utama.', light: '#F8FAFC', dark: '#212B3C', val: 'Light: Slate 10 • Dark: Slate 90' },
  ];

  const surfaceRows = [
    { name: 'field', val: 'Light: Slate 20 • Dark: Slate 90', light: '#F1F5F9', dark: '#212B3C', desc: 'Latar belakang untuk elemen input (text input, password input, dsb.)' },
    { name: 'field-hover', val: 'Light: Slate 30 • Dark: Slate 80', light: '#E2E8F0', dark: '#283445', desc: 'Latar field saat elemen input di-hover.' },
    { name: 'surface-brand', val: 'Light + Dark: Blue 60', light: '#0F62FE', dark: '#0F62FE', desc: 'Latar kontainer utama berbasis warna brand.' },
    { name: 'surface-brand-active', val: 'Light + Dark: Blue 80', light: '#002D9C', dark: '#002D9C', desc: 'Efek warna saat kontainer brand ditekan/diklik.' },
    { name: 'surface-brand-hover', val: 'Light + Dark: Blue 70', light: '#0043CE', dark: '#0043CE', desc: 'Efek warna saat kontainer brand di-hover.' },
    { name: 'surface-brand-subtle', val: 'Light: Blue 10 • Dark: Blue 100', light: '#EDF5FF', dark: '#101831', desc: 'Latar kontainer brand dengan tona muda/transparan.' },
    { name: 'surface-default', val: 'Light: white • Dark: Slate 100', light: '#FFFFFF', dark: '#0F172A', desc: 'Latar standar untuk kontainer utama seperti card, modal, atau side panel.' },
    { name: 'surface-disabled', val: 'Light: Slate 40 • Dark: Slate 70', light: '#CBD5E1', dark: '#475569', desc: 'Latar belakang kontainer atau elemen dalam kondisi nonaktif.' },
    { name: 'surface-green-subtle', val: 'Light: Green 10 • Dark: Green 100', light: '#F0FDF4', dark: '#052E16', desc: 'Latar kontainer Green (success) versi tint muda.' },
    { name: 'surface-rose-subtle', val: 'Light: Rose 10 • Dark: Rose 100', light: '#FFEFEF', dark: '#43080C', desc: 'Latar kontainer Rose (danger) versi tint muda.' },
    { name: 'surface-amber-subtle', val: 'Light: Amber 10 • Dark: Amber 90', light: '#FFFBEB', dark: '#83380B', desc: 'Latar kontainer Amber (warning) versi tint muda.' },
    { name: 'surface-slate', val: 'Light: Slate 80 • Dark: Slate 90', light: '#283445', dark: '#212B3C', desc: 'Latar kontainer netral berbasis warna Slate.' },
  ];

  const layerRows = [
    { name: 'layer', val: 'Light: Slate 10 • Dark: Slate 90', light: '#F8FAFC', dark: '#212B3C', desc: 'Lapisan di atas surface (misal item baris tabel atau list item).' },
    { name: 'layer-active', val: 'Light: Slate 30 • Dark: Slate 70', light: '#E2E8F0', dark: '#475569', desc: 'Efek warna saat elemen layer ditekan/diklik.' },
    { name: 'layer-hover', val: 'Light: Slate 20 • Dark: Slate 80', light: '#F1F5F9', dark: '#283445', desc: 'Efek warna saat elemen layer di-hover.' },
    { name: 'layer-brand-hover', val: 'Light: Blue 60-alpha-12 • Dark: Blue 60-alpha-32', light: 'rgba(15, 98, 254, 0.12)', dark: 'rgba(15, 98, 254, 0.32)', desc: 'Efek warna hover bertema brand untuk elemen layer.' },
    { name: 'layer-tint', val: 'Light: Slate 60-alpha-4 • Dark: Slate 100-alpha-24', light: 'rgba(100, 116, 139, 0.04)', dark: 'rgba(15, 23, 42, 0.24)', desc: 'Lapisan bertona netral/transparan untuk menandai area di atas surface.' },
  ];

  const elevationRows = [
    { name: 'elevation-high', val: 'black-alpha-16', desc: 'Bayangan paling tegas/dalam untuk elevasi hirarki tertinggi (misal modal dialog, drawer, floating notification).' },
    { name: 'elevation-medium', val: 'black-alpha-12', desc: 'Bayangan sedang untuk komponen melayang (misal popover, menu) atau hover state.' },
    { name: 'elevation-low', val: 'black-alpha-8', desc: 'Bayangan halus untuk komponen berpendar ringan (misal card rendah atau dropdown).' },
  ];

  const iconSemanticRows = [
    { name: 'icon-disabled', val: 'Slate 100-alpha-24', light: 'rgba(15, 23, 42, 0.24)', dark: 'rgba(255, 255, 255, 0.24)', desc: 'Warna ikon untuk elemen dalam kondisi nonaktif.' },
    { name: 'icon-helper', val: 'Light: Slate 60 • Dark: Slate 50', light: '#64748B', dark: '#94A3B8', desc: 'Warna ikon pembantu (misal ikon petunjuk).' },
    { name: 'icon-interactive', val: 'Light + Dark: Blue 60', light: '#0F62FE', dark: '#0F62FE', desc: 'Warna ikon untuk elemen interaktif (misal dapat diklik/di-hover).' },
    { name: 'icon-primary', val: 'Light: Slate 100 • Dark: Slate 10', light: '#0F172A', dark: '#F8FAFC', desc: 'Warna utama untuk ikon penting atau hirarki tertinggi.' },
    { name: 'icon-secondary', val: 'Light: Slate 70 • Dark: Slate 20', light: '#475569', dark: '#F1F5F9', desc: 'Warna sekunder untuk ikon pendukung dengan tingkat kontras lebih rendah.' },
    { name: 'icon-tertiary-green', val: 'Light: Green 80 • Dark: Green 50', light: '#15803D', dark: '#4ADE80', desc: 'Warna ikon hijau untuk indikasi sukses/positif.' },
    { name: 'icon-tertiary-rose', val: 'Light: Rose 60 • Dark: Rose 50', light: '#E6212A', dark: '#FF3941', desc: 'Warna ikon merah/rose untuk indikasi bahaya/eror.' },
  ];

  const borderSemanticRows = [
    { name: 'border-alert', val: 'Amber 60', light: '#F59E0B', dark: '#F59E0B', desc: 'Garis tepi bertema Amber untuk status peringatan (warning/alert).' },
    { name: 'border-card', val: 'Light: Slate 40 • Dark: Slate 70', light: '#CBD5E1', dark: '#475569', desc: 'Garis tepi khusus untuk kontainer berbentuk card.' },
    { name: 'border-card-hover', val: 'Blue 60', light: '#0F62FE', dark: '#0F62FE', desc: 'Efek warna garis tepi card saat dalam kondisi di-hover.' },
    { name: 'border-danger', val: 'Rose 50', light: '#FF3941', dark: '#FF3941', desc: 'Garis tepi bertema Rose untuk status bahaya atau eror (danger/error).' },
    { name: 'border-disabled', val: 'Light: Slate 30 • Dark: Slate 70', light: '#E2E8F0', dark: '#475569', desc: 'Garis tepi untuk komponen dalam kondisi nonaktif (disabled).' },
    { name: 'border-subtle-01', val: 'Light: Slate 20 • Dark: Slate 90', light: '#F1F5F9', dark: '#212B3C', desc: 'Garis tepi sangat tipis untuk pemisah antar elemen ringan.' },
    { name: 'border-success', val: 'Green 70', light: '#16A34A', dark: '#16A34A', desc: 'Garis tepi bertema Green untuk status berhasil/sukses.' },
  ];

  // Helper component to render component documentation card
  const DocCard = ({
    title,
    badgeText = 'Atom',
    description,
    usageSnippet,
    children,
  }: {
    title: string;
    badgeText?: string;
    description: string;
    usageSnippet?: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 mb-1.5">
          <Badge variant="primary" appearance="solid" size="sm">
            {badgeText}
          </Badge>
          <span className="text-xs font-mono text-slate-400">@aposis/design-system</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
          {description}
        </p>

        {usageSnippet && (
          <div className="mt-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-950/60 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Icon icon={IconCode} size="sm" className="text-aposis-blue-50" />
                Cara Penggunaan / Kode (TSX)
              </span>
              <button
                type="button"
                onClick={() => copySnippet(usageSnippet)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-[11px] font-sans font-medium active:scale-95"
                title="Salin kode penggunaan"
              >
                {copiedCode ? <Icon icon={IconCheck} size="sm" className="text-emerald-400" /> : <Icon icon={IconCopy} size="sm" />}
                <span>{copiedCode ? 'Tersalin!' : 'Salin Kode'}</span>
              </button>
            </div>
            <pre className="p-4 overflow-x-auto font-mono text-xs text-sky-300 whitespace-pre leading-relaxed select-all">
              <code>{usageSnippet}</code>
            </pre>
          </div>
        )}
      </div>

      <div className="pt-2">{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isMobileMenuOpen ? <Icon icon={IconX} size="md" /> : <Icon icon={IconMenu2} size="md" />}
          </button>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-aposis-blue-60 to-aposis-cyan-50 flex items-center justify-center text-white font-black text-sm shadow-sm">
            v3
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white tracking-tight">Aposis Design System</span>
              <Badge variant="primary" appearance="subtle" size="sm">
                v3.1
              </Badge>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Dokumentasi & Katalog Komponen Resmi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            {isDarkMode ? <Icon icon={IconSun} size="sm" className="text-amber-400" /> : <Icon icon={IconMoon} size="sm" />}
            <span className="hidden sm:inline">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </header>

      {/* Main Two-Column Layout */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto">
        {/* Left Sidebar Navigation */}
        <aside
          className={`fixed md:sticky top-[57px] left-0 h-[calc(100vh-57px)] w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 overflow-y-auto z-30 transition-transform duration-200 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="space-y-6">
            {sidebarNavGroups.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-1">
                <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {group.title}
                </div>
                {group.items.map((item) => {
                  const IconComp = item.icon;
                  const isActive = selectedId === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedId(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-aposis-blue-60 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon icon={IconComp} size="sm" className={isActive ? 'text-white' : 'text-slate-400'} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main ref={mainRef} className="flex-1 p-6 sm:p-10 max-w-4xl overflow-y-auto">
          {/* 1. BUTTON ATOM */}
          {selectedId === 'button' && (
            <DocCard
              title="Button"
              badgeText="Atom"
              description="Komponen tombol aksi dengan berbagai pilihan varian, ukuran, status loading, dan dukungan penempatan ikon di sisi kiri atau kanan."
              usageSnippet={`import { Button } from '@aposis/design-system';\n\n<Button variant="primary" size="md">Simpan Perubahan</Button>`}
            >
              <div className="space-y-6">
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle>Varian Tombol</CardTitle>
                    <CardDescription>Pilihan tema visual sesuai hirarki tindakan pengguna</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button variant="primary">Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="success">Success</Button>
                      <Button variant="danger">Danger</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle>Ukuran Tombol</CardTitle>
                    <CardDescription>Tersedia dalam 3 ukuran standar: sm, md, dan lg</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button size="sm">Small (sm)</Button>
                      <Button size="md">Medium (md)</Button>
                      <Button size="lg">Large (lg)</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle>Status & Dukungan Ikon</CardTitle>
                    <CardDescription>Status loading, disabled, dan penempatan ikon</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button leftIcon={<Icon icon={IconPlus} size="sm" />}>Dengan Icon Kiri</Button>
                      <Button rightIcon={<Icon icon={IconSend} size="sm" />} variant="outline">Icon Kanan</Button>
                      <Button isLoading>Sedang Memproses...</Button>
                      <Button disabled>Disabled Button</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </DocCard>
          )}

          {/* 2. ICON ATOM */}
          {selectedId === 'icon' && (
            <DocCard
              title="Icon (Tabler & Custom)"
              badgeText="Atom"
              description="Standar komponen ikon Aposis berbasis Tabler Icons dengan ketebalan garis (stroke width) dan ukuran proporsional resmi: SM (16px / 1.25px), MD (20px / 1.5px), LG (24px / 2px)."
              usageSnippet={`import { Icon } from '@aposis/design-system';\nimport { IconPlus, IconSearch } from '@tabler/icons-react';\n\n<Icon icon={IconPlus} size="md" />`}
            >
              <div className="space-y-6">
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle>Standar Ukuran & Stroke Width</CardTitle>
                    <CardDescription>Ketebalan garis secara otomatis menyesuaikan ukuran ikon</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-aposis-blue-60">
                          <Icon icon={IconPlus} size="sm" />
                        </div>
                        <div>
                          <div className="text-sm font-bold">SM: 16px</div>
                          <div className="text-xs text-slate-400">Stroke: 1.25px</div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-aposis-blue-60">
                          <Icon icon={IconPlus} size="md" />
                        </div>
                        <div>
                          <div className="text-sm font-bold">MD: 20px</div>
                          <div className="text-xs text-slate-400">Stroke: 1.5px</div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-aposis-blue-60">
                          <Icon icon={IconPlus} size="lg" />
                        </div>
                        <div>
                          <div className="text-sm font-bold">LG: 24px</div>
                          <div className="text-xs text-slate-400">Stroke: 2px</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle>Ikon Kustom Figma</CardTitle>
                    <CardDescription>Komponen kustom bahasa dan rumus matematika</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 rounded-xl border border-dashed border-purple-300 dark:border-purple-800 bg-purple-50/30 dark:bg-purple-950/20 flex flex-wrap items-center gap-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          <IconLanguageId size="md" />
                        </div>
                        <span className="text-xs font-semibold">Language ID</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          <IconLanguageEn size="md" />
                        </div>
                        <span className="text-xs font-semibold">Language EN</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          <IconMathSqrt size="md" />
                        </div>
                        <span className="text-xs font-semibold">Math √x</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </DocCard>
          )}

          {/* 3. INPUT ATOM */}
          {selectedId === 'input' && (
            <DocCard
              title="Input"
              badgeText="Atom"
              description="Elemen masukan teks dengan status fokus elegan, error highlight, dan slot ikon di sisi kiri atau kanan."
              usageSnippet={`import { Input } from '@aposis/design-system';\n\n<Input placeholder="Masukkan nama..." error="Harus diisi" />`}
            >
              <Card className="dark:bg-slate-900 dark:border-slate-800">
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Input Normal</label>
                    <Input
                      placeholder="Masukkan nama lengkap..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Input dengan Pesan Eror</label>
                    <Input
                      placeholder="email@domain.com"
                      defaultValue="invalid-email"
                      error="Format alamat email tidak valid"
                      className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    />
                  </div>
                </CardContent>
              </Card>
            </DocCard>
          )}

          {/* 4. BADGE ATOM */}
          {selectedId === 'badge' && (
            <DocCard
              title="Badge"
              badgeText="Atom"
              description="Pill label status untuk menandai kondisi data aktif, menunggu, selesai, atau kategori."
              usageSnippet={`import { Badge } from '@aposis/design-system';\n\n<Badge variant="success" dot>Aktif</Badge>`}
            >
              <Card className="dark:bg-slate-900 dark:border-slate-800">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex flex-wrap gap-2.5">
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="success" dot>Success</Badge>
                    <Badge variant="warning" dot>Warning</Badge>
                    <Badge variant="danger" dot>Danger</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="neutral">Neutral</Badge>
                    <Badge variant="primary" appearance="solid">Solid</Badge>
                    <Badge variant="success" appearance="outline">Outline</Badge>
                  </div>
                </CardContent>
              </Card>
            </DocCard>
          )}

          {/* 5. AVATAR ATOM */}
          {selectedId === 'avatar' && (
            <DocCard
              title="Avatar"
              badgeText="Atom"
              description="Komponen foto profil pengguna dengan inisial nama otomatis dan indikator status online/busy/away/offline."
              usageSnippet={`import { Avatar } from '@aposis/design-system';\n\n<Avatar name="Ahmad Fauzi" size="md" status="online" />`}
            >
              <Card className="dark:bg-slate-900 dark:border-slate-800">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <Avatar name="Ahmad Fauzi" size="xs" status="online" />
                    <Avatar name="Budi Santoso" size="sm" status="away" />
                    <Avatar name="Citra Kirana" size="md" status="busy" />
                    <Avatar name="Dewi Lestari" size="lg" status="online" />
                    <Avatar name="Eko Prasetyo" size="xl" status="offline" />
                  </div>
                </CardContent>
              </Card>
            </DocCard>
          )}

          {/* 6. CHECKBOX ATOM */}
          {selectedId === 'checkbox' && (
            <DocCard
              title="Checkbox"
              badgeText="Atom"
              description="Kotak centang aksesibel dengan animasi transisi centang dan deskripsi pembantu."
              usageSnippet={`import { Checkbox } from '@aposis/design-system';\n\n<Checkbox label="Setuju syarat & ketentuan" />`}
            >
              <Card className="dark:bg-slate-900 dark:border-slate-800">
                <CardContent className="pt-6 space-y-3">
                  <Checkbox
                    checked={checkboxChecked}
                    onChange={(e) => setCheckboxChecked(e.target.checked)}
                    label="Kirimkan notifikasi email ketika ada pembaruan data"
                    description="Anda dapat mengubah preferensi ini kapan saja di pengaturan profil."
                  />
                  <Checkbox label="Saya menyetujui syarat dan ketentuan penggunaan sistem Aposis" />
                  <Checkbox disabled checked label="Fitur enkripsi end-to-end (Wajib aktif secara sistem)" />
                </CardContent>
              </Card>
            </DocCard>
          )}

          {/* 7. SPINNER ATOM */}
          {selectedId === 'spinner' && (
            <DocCard
              title="Spinner"
              badgeText="Atom"
              description="Animasi pemuatan SVG ringan dalam berbagai ukuran dan warna."
              usageSnippet={`import { Spinner } from '@aposis/design-system';\n\n<Spinner size="md" variant="primary" />`}
            >
              <Card className="dark:bg-slate-900 dark:border-slate-800">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <Spinner size="xs" />
                    <Spinner size="sm" />
                    <Spinner size="md" />
                    <Spinner size="lg" />
                  </div>
                </CardContent>
              </Card>
            </DocCard>
          )}

          {/* MOLECULES: FORM FIELD */}
          {selectedId === 'form-field' && (
            <DocCard
              title="FormField"
              badgeText="Molecule"
              description="Komponen pembungkus terpadu yang menyatukan label, tanda wajib (*), input kontrol, helper text, dan pesan error."
              usageSnippet={`import { FormField, Input } from '@aposis/design-system';\n\n<FormField label="NISN" required helperText="10 digit nomor">\n  <Input placeholder="0051283921" />\n</FormField>`}
            >
              <Card className="dark:bg-slate-900 dark:border-slate-800">
                <CardContent className="pt-6 space-y-4 max-w-md">
                  <FormField label="Nomor Induk Siswa Nasional (NISN)" required helperText="10 digit angka resmi dari Kemdikbud">
                    <Input placeholder="Contoh: 0051283921" className="dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                  </FormField>
                  <FormField label="Kata Sandi Baru" required error="Kata sandi minimal 8 karakter">
                    <Input type="password" placeholder="••••••••" className="dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                  </FormField>
                </CardContent>
              </Card>
            </DocCard>
          )}

          {/* MOLECULES: SEARCH BAR */}
          {selectedId === 'search-bar' && (
            <DocCard
              title="SearchBar"
              badgeText="Molecule"
              description="Input pencarian data dengan tombol pembersih (clear) instan dan indikator shortcut keyboard."
              usageSnippet={`import { SearchBar } from '@aposis/design-system';\n\n<SearchBar placeholder="Cari data..." onSearch={(val) => console.log(val)} />`}
            >
              <Card className="dark:bg-slate-900 dark:border-slate-800">
                <CardContent className="pt-6">
                  <SearchBar placeholder="Cari siswa, guru, kelas..." onSearch={(q) => alert(`Mencari: ${q}`)} />
                </CardContent>
              </Card>
            </DocCard>
          )}

          {/* MOLECULES: ALERT */}
          {selectedId === 'alert' && (
            <DocCard
              title="Alert"
              badgeText="Molecule"
              description="Banner notifikasi kontekstual untuk memberikan umpan balik (info, success, warning, danger) kepada pengguna."
              usageSnippet={`import { Alert } from '@aposis/design-system';\n\n<Alert variant="success" title="Berhasil">Data telah disimpan.</Alert>`}
            >
              <div className="space-y-3">
                {isAlertVisible && (
                  <Alert variant="info" title="Pembaruan Sistem Tersedia" onClose={() => setIsAlertVisible(false)}>
                    Versi 3.1 dari Aposis Design System telah dimuat.
                  </Alert>
                )}
                <Alert variant="success" title="Sinkronisasi Berhasil">Data 500 siswa telah berhasil diperbarui.</Alert>
                <Alert variant="warning" title="Peringatan">Koneksi database kedua mengalami latensi tinggi.</Alert>
                <Alert variant="danger" title="Gagal Menyimpan">Token autentikasi sesi telah kedaluwarsa.</Alert>
              </div>
            </DocCard>
          )}

          {/* MOLECULES: MODAL */}
          {selectedId === 'modal' && (
            <DocCard
              title="Modal"
              badgeText="Molecule"
              description="Jendela dialog mengambang aksesibel dengan backdrop blur, header, body yang dapat di-scroll, dan action footer."
              usageSnippet={`import { Modal, Button } from '@aposis/design-system';\n\n<Modal isOpen={open} onClose={() => setOpen(false)} title="Hapus Data">\n  <p>Konfirmasi tindakan?</p>\n</Modal>`}
            >
              <Card className="dark:bg-slate-900 dark:border-slate-800">
                <CardContent className="pt-6">
                  <Button onClick={() => setIsModalOpen(true)}>Buka Contoh Modal Dialog</Button>
                </CardContent>
              </Card>
            </DocCard>
          )}

          {/* MOLECULES: TABS */}
          {selectedId === 'tabs' && (
            <DocCard
              title="Tabs"
              badgeText="Molecule"
              description="Navigasi tab dengan dua varian tampilan: garis bawah (underline) dan tombol kapsul (pills)."
              usageSnippet={`import { Tabs } from '@aposis/design-system';\n\n<Tabs items={[{ id: 'tab1', label: 'Tab 1' }]} activeTab={active} onChange={setActive} />`}
            >
              <Card className="dark:bg-slate-900 dark:border-slate-800">
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 mb-2 block">Varian Underline</span>
                    <Tabs
                      items={[
                        { id: 'tab1', label: 'Profil Siswa' },
                        { id: 'tab2', label: 'Riwayat Nilai' },
                        { id: 'tab3', label: 'Dokumen' },
                      ]}
                      activeTab={activeTabDemo}
                      onChange={setActiveTabDemo}
                      variant="underline"
                    />
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-500 mb-2 block">Varian Pills</span>
                    <Tabs
                      items={[
                        { id: 'tab1', label: 'Harian' },
                        { id: 'tab2', label: 'Mingguan' },
                        { id: 'tab3', label: 'Bulanan' },
                      ]}
                      activeTab={activeTabDemo}
                      onChange={setActiveTabDemo}
                      variant="pills"
                    />
                  </div>
                </CardContent>
              </Card>
            </DocCard>
          )}

          {/* ORGANISMS: NAVBAR */}
          {selectedId === 'navbar' && (
            <DocCard
              title="Navbar"
              badgeText="Organism"
              description="Header aplikasi komprehensif dengan logo brand, menu navigasi, notifikasi, dan profil pengguna."
              usageSnippet={`import { Navbar } from '@aposis/design-system';\n\n<Navbar brandName="Aposis Portal" user={{ name: 'Admin', email: 'admin@aposis.id' }} />`}
            >
              <Card className="dark:bg-slate-900 dark:border-slate-800">
                <CardContent className="p-0 border-t border-slate-100 dark:border-slate-800 rounded-b-2xl overflow-hidden">
                  <Navbar
                    brandName="Aposis Portal"
                    navLinks={[
                      { id: '1', label: 'Dashboard', active: true },
                      { id: '2', label: 'Siswa' },
                      { id: '3', label: 'Laporan' },
                    ]}
                    user={{ name: 'Admin User', email: 'admin@aposis.id' }}
                    notificationCount={2}
                    actions={<Button size="sm" variant="outline">Bantuan</Button>}
                  />
                </CardContent>
              </Card>
            </DocCard>
          )}

          {/* ORGANISMS: SIDEBAR */}
          {selectedId === 'sidebar' && (
            <DocCard
              title="Sidebar"
              badgeText="Organism"
              description="Menu samping vertikal aplikasi dengan dukungan grouping link, badge counter, dan mode collapse."
              usageSnippet={`import { Sidebar } from '@aposis/design-system';\n\n<Sidebar groups={sidebarGroups} collapsed={isCollapsed} />`}
            >
              <Card className="dark:bg-slate-900 dark:border-slate-800">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSidebarDemoCollapsed(!sidebarDemoCollapsed)}
                    >
                      {sidebarDemoCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                    </Button>
                  </div>
                  <div className="h-80 rounded-2xl overflow-hidden border border-slate-700 flex">
                    <Sidebar
                      groups={sidebarNavGroups.slice(1, 3).map((g) => ({
                        title: g.title,
                        items: g.items.map((i) => ({
                          id: i.id,
                          label: i.label,
                          icon: <Icon icon={i.icon} size="sm" />,
                        })),
                      }))}
                      collapsed={sidebarDemoCollapsed}
                      header={<div className="font-bold text-white text-xs">Aposis Menu</div>}
                    />
                    <div className="flex-1 bg-slate-100 dark:bg-slate-800 p-4 text-xs text-slate-400 flex items-center justify-center">
                      Workspace Area
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DocCard>
          )}

          {/* ORGANISMS: STAT CARD */}
          {selectedId === 'stat-card' && (
            <DocCard
              title="StatCard"
              badgeText="Organism"
              description="Kartu metrik statistik dashboard dengan indikator persentase kenaikan/penurunan (trend up/down)."
              usageSnippet={`import { StatCard } from '@aposis/design-system';\n\n<StatCard title="Total Siswa" value="12,840" change={{ value: '+14%', trend: 'up' }} />`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard
                  title="Total Siswa Aktif"
                  value="12,840"
                  change={{ value: '+14.2%', trend: 'up', label: 'vs bulan lalu' }}
                  icon={<Icon icon={IconUsers} size="md" className="text-aposis-blue-60" />}
                />
                <StatCard
                  title="Tingkat Akurasi"
                  value="99.4%"
                  change={{ value: 'Stabil', trend: 'neutral' }}
                  icon={<Icon icon={IconSparkles} size="md" className="text-purple-600" />}
                  iconBg="bg-purple-50 dark:bg-purple-950/40"
                />
              </div>
            </DocCard>
          )}

          {/* ORGANISMS: DATA TABLE */}
          {selectedId === 'data-table' && (
            <DocCard
              title="DataTable"
              badgeText="Organism"
              description="Tabel data reusable lengkap dengan kolom yang dapat dikonfigurasi, status kosong (empty state), dan paginasi."
              usageSnippet={`import { DataTable } from '@aposis/design-system';\n\n<DataTable columns={cols} data={data} keyExtractor={(i) => i.id} />`}
            >
              <DataTable
                columns={studentColumns}
                data={mockStudents}
                keyExtractor={(item) => item.id}
                pagination={{
                  currentPage: tablePage,
                  totalPages: 5,
                  totalItems: 48,
                  onPageChange: setTablePage,
                }}
              />
            </DocCard>
          )}

          {/* ORGANISMS: CARD */}
          {selectedId === 'card' && (
            <DocCard
              title="Card"
              badgeText="Organism"
              description="Kontainer kartu modular dengan CardHeader, CardTitle, CardDescription, CardContent, dan CardFooter."
              usageSnippet={`import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@aposis/design-system';\n\n<Card>\n  <CardHeader><CardTitle>Judul</CardTitle></CardHeader>\n  <CardContent>Konten...</CardContent>\n</Card>`}
            >
              <Card hoverable className="max-w-md dark:bg-slate-900 dark:border-slate-800">
                <CardHeader>
                  <CardTitle>Judul Kartu</CardTitle>
                  <CardDescription>Deskripsi singkat kartu untuk menjelaskan isinya.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Text variant="body" className="dark:text-slate-300">
                    Ini adalah contoh isi dari komponen <code>CardContent</code>. Sangat fleksibel dan dapat diisi elemen apapun.
                  </Text>
                </CardContent>
                <CardFooter className="dark:bg-slate-850 dark:border-slate-800">
                  <span className="text-xs text-slate-400">Status: Tersimpan</span>
                  <Button size="sm">Aksi Kartu</Button>
                </CardFooter>
              </Card>
            </DocCard>
          )}

          {/* TOKENS: PRIMITIVE PALETTES */}
          {selectedId === 'palettes' && (
            <DocCard
              title="Primitive Token Palettes"
              badgeText="Token"
              description="7 palet warna primitif (Green, Cyan, Rose, Amber, Blue, Violet, Slate) dalam 10 tingkatan intensitas (10-100) dari Figma Aposis."
              usageSnippet={`// Menggunakan Tailwind class:\n<div className="bg-aposis-blue-60 text-white" />\n\n// Atau JavaScript tokens:\nimport { primitiveColors } from '@aposis/design-system/tokens';`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {paletteCards.map((pal) => (
                  <div key={pal.key} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="font-bold text-sm">{pal.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">10 - 100</span>
                    </div>
                    <div className="space-y-1 font-mono text-xs">
                      {Object.entries(pal.color).map(([level, hex]) => (
                        <div key={level} className="flex items-center justify-between py-1 px-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800">
                          <span className="font-sans capitalize text-slate-600 dark:text-slate-400">{pal.key} {level}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-[11px]">{hex}</span>
                            <span className="w-4 h-4 rounded-full border border-black/10 inline-block shadow-2xs" style={{ backgroundColor: hex }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </DocCard>
          )}

          {/* TOKENS: TEXT SEMANTICS */}
          {selectedId === 'text-semantics' && (
            <DocCard
              title="Text Semantic Colors"
              badgeText="Token"
              description="Token semantik teks dengan penyesuaian otomatis untuk Light Mode dan Dark Mode."
              usageSnippet={`<span className="text-text-primary" />\n<span className="text-text-interactive hover:text-text-interactive-hover" />`}
            >
              <Card className="dark:bg-slate-900 dark:border-slate-800">
                <CardContent className="pt-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase font-semibold">
                          <th className="py-2.5 px-3">Name</th>
                          <th className="py-2.5 px-3">Value</th>
                          <th className="py-2.5 px-3 text-center">Light / Dark</th>
                          <th className="py-2.5 px-3">Live Preview</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                        {semanticTextRows.map((r) => (
                          <tr key={r.name} className="hover:bg-slate-50 dark:hover:bg-slate-850">
                            <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">{r.name}</td>
                            <td className="py-2.5 px-3 text-slate-500 font-sans">{r.value}</td>
                            <td className="py-2.5 px-3 text-center">
                              <span className="w-3.5 h-3.5 rounded-full inline-block mr-1 shadow-2xs" style={{ backgroundColor: r.light }} />
                              <span className="w-3.5 h-3.5 rounded-full inline-block shadow-2xs" style={{ backgroundColor: r.dark }} />
                            </td>
                            <td className="py-2.5 px-3 font-sans font-medium" style={{ color: isDarkMode ? r.dark : r.light }}>
                              Teks Contoh
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </DocCard>
          )}

          {/* TOKENS: BG & SURFACE SEMANTICS */}
          {selectedId === 'bg-surface-semantics' && (
            <DocCard
              title="Background & Surface Semantic Colors"
              badgeText="Token"
              description="Warna latar belakang untuk kanvas, halaman, field input, serta kontainer permukaan (surface)."
              usageSnippet={`<div className="bg-background-default text-text-primary" />\n<div className="bg-surface-field border border-border-card" />`}
            >
              <div className="space-y-6">
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardHeader><CardTitle>Background Colors</CardTitle></CardHeader>
                  <CardContent className="pt-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase">
                            <th className="py-2 px-3">Name</th>
                            <th className="py-2 px-3">Value</th>
                            <th className="py-2 px-3">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {backgroundRows.map((r) => (
                            <tr key={r.name}>
                              <td className="py-2 px-3 font-mono font-semibold">{r.name}</td>
                              <td className="py-2 px-3 text-slate-400">{r.val}</td>
                              <td className="py-2 px-3">{r.desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardHeader><CardTitle>Surface Colors (Sampel)</CardTitle></CardHeader>
                  <CardContent className="pt-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase">
                            <th className="py-2 px-3">Name</th>
                            <th className="py-2 px-3">Value</th>
                            <th className="py-2 px-3">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {surfaceRows.map((r) => (
                            <tr key={r.name}>
                              <td className="py-2 px-3 font-mono font-semibold">{r.name}</td>
                              <td className="py-2 px-3 text-slate-400">{r.val}</td>
                              <td className="py-2 px-3">{r.desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </DocCard>
          )}

          {/* TOKENS: LAYER & ELEVATION */}
          {selectedId === 'layer-elevation' && (
            <DocCard
              title="Layer & Elevation Semantic Colors"
              badgeText="Token"
              description="Spesifikasi warna lapisan interaktif dan tingkatan elevasi bayangan (shadow) komponen."
              usageSnippet={`<div className="bg-layer hover:bg-layer-hover" />\n<div className="shadow-elevation-high" />`}
            >
              <div className="space-y-6">
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardHeader><CardTitle>Elevation Shadows</CardTitle></CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {elevationRows.map((r) => (
                        <div
                          key={r.name}
                          className={`p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 ${
                            r.name === 'elevation-high' ? 'shadow-elevation-high' : r.name === 'elevation-medium' ? 'shadow-elevation-medium' : 'shadow-elevation-low'
                          }`}
                        >
                          <div className="font-mono text-xs font-bold text-aposis-blue-60">{r.name}</div>
                          <p className="text-xs text-slate-500 mt-2">{r.desc}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardHeader><CardTitle>Layer Colors</CardTitle></CardHeader>
                  <CardContent className="pt-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase">
                            <th className="py-2 px-3">Name</th>
                            <th className="py-2 px-3">Value</th>
                            <th className="py-2 px-3">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {layerRows.map((r) => (
                            <tr key={r.name}>
                              <td className="py-2 px-3 font-mono font-semibold">{r.name}</td>
                              <td className="py-2 px-3 text-slate-400">{r.val}</td>
                              <td className="py-2 px-3">{r.desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </DocCard>
          )}

          {/* TOKENS: ICON & BORDER SEMANTICS */}
          {selectedId === 'icon-border-semantics' && (
            <DocCard
              title="Icon & Border Semantic Colors"
              badgeText="Token"
              description="Warna semantik untuk ikon antarmuka dan garis tepi (border) pembatas komponen."
              usageSnippet={`<Icon icon={IconSearch} className="text-icon-interactive" />\n<div className="border border-border-card hover:border-border-card-hover" />`}
            >
              <div className="space-y-6">
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardHeader><CardTitle>Icon Semantic Colors</CardTitle></CardHeader>
                  <CardContent className="pt-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase">
                            <th className="py-2 px-3">Name</th>
                            <th className="py-2 px-3">Value</th>
                            <th className="py-2 px-3">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {iconSemanticRows.map((r) => (
                            <tr key={r.name}>
                              <td className="py-2 px-3 font-mono font-semibold">{r.name}</td>
                              <td className="py-2 px-3 text-slate-400">{r.val}</td>
                              <td className="py-2 px-3">{r.desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardHeader><CardTitle>Border Semantic Colors</CardTitle></CardHeader>
                  <CardContent className="pt-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase">
                            <th className="py-2 px-3">Name</th>
                            <th className="py-2 px-3">Value</th>
                            <th className="py-2 px-3">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {borderSemanticRows.map((r) => (
                            <tr key={r.name}>
                              <td className="py-2 px-3 font-mono font-semibold">{r.name}</td>
                              <td className="py-2 px-3 text-slate-400">{r.val}</td>
                              <td className="py-2 px-3">{r.desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </DocCard>
          )}

          {/* TOKENS: TYPOGRAPHY SCALE */}
          {selectedId === 'typography-scale' && (
            <DocCard
              title="Typography v3.1 (Lexend)"
              badgeText="Token"
              description="Skala tipografi resmi berbasis font Lexend yang dirancang khusus untuk Desktop dan Mobile."
              usageSnippet={`import { Heading, Text } from '@aposis/design-system';\n\n<Heading variant="h1">Section H1</Heading>\n<Text variant="body-lg">Body Text</Text>`}
            >
              <Card className="dark:bg-slate-900 dark:border-slate-800">
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-1">
                    <Heading variant="display">Display Title</Heading>
                    <div className="text-[11px] text-slate-400">Display • 60px / 3.75rem • weight 300 • line-height 1.1 • tracking -0.02em</div>
                  </div>
                  <div className="space-y-1">
                    <Heading variant="h1">Section H1</Heading>
                    <div className="text-[11px] text-slate-400">H1 • 48px / 3rem • weight 500 • line-height 1.15 • tracking -0.02em</div>
                  </div>
                  <div className="space-y-1">
                    <Heading variant="h2">Section H2</Heading>
                    <div className="text-[11px] text-slate-400">H2 • 36px / 2.25rem • weight 500 • line-height 1.2 • tracking -0.01em</div>
                  </div>
                  <div className="space-y-1">
                    <Heading variant="h3">Section H3</Heading>
                    <div className="text-[11px] text-slate-400">H3 • 30px / 1.875rem • weight 500 • line-height 1.25 • tracking -0.01em</div>
                  </div>
                  <div className="space-y-1">
                    <Heading variant="h4">Section H4</Heading>
                    <div className="text-[11px] text-slate-400">H4 • 24px / 1.5rem • weight 500 • line-height 1.3 • tracking 0</div>
                  </div>
                  <div className="space-y-1">
                    <Heading variant="h5">Section H5</Heading>
                    <div className="text-[11px] text-slate-400">H5 • 20px / 1.25rem • weight 500 • line-height 1.4 • tracking 0</div>
                  </div>
                  <div className="space-y-1">
                    <Heading variant="title">Title</Heading>
                    <div className="text-[11px] text-slate-400">Title • 18px / 1.125rem • weight 500 • line-height 1.4 • tracking 0</div>
                  </div>
                  <div className="space-y-1">
                    <Text variant="body-lg">Body Large</Text>
                    <div className="text-[11px] text-slate-400">Body-lg • 16px / 1rem • weight 400 • line-height 1.3 • tracking 0</div>
                  </div>
                  <div className="space-y-1">
                    <Text variant="subtitle">Subtitle</Text>
                    <div className="text-[11px] text-slate-400">Subtitle • 14px / 0.875rem • weight 600 • line-height 1.3 • tracking 0</div>
                  </div>
                  <div className="space-y-1">
                    <Text variant="body">Body Regular</Text>
                    <div className="text-[11px] text-slate-400">Body • 14px / 0.875rem • weight 400 • line-height 1.3 • tracking 0</div>
                  </div>
                  <div className="space-y-1">
                    <Text variant="caption">Helper Text, Caption</Text>
                    <div className="text-[11px] text-slate-400">Caption • 12px / 0.75rem • weight 400 • line-height 1.5 • tracking 0.01em</div>
                  </div>
                  <div className="space-y-1">
                    <Text variant="overline">Overline Text</Text>
                    <div className="text-[11px] text-slate-400">Overline • 11px / 0.6875rem • weight 600 • line-height 1.3 • tracking 0.06em</div>
                  </div>
                </CardContent>
              </Card>
            </DocCard>
          )}

          {/* TOKENS: UNIT SCALE */}
          {selectedId === 'unit-scale' && (
            <DocCard
              title="Unit Scale v3.1"
              badgeText="Token"
              description="Daftar konversi jarak resmi dari satuan pixel ke rem (1px s/d 144px) dari Figma."
              usageSnippet={`import { units } from '@aposis/design-system/tokens';\n\n// Tailwind spacing utility: p-16px (1rem), m-24px (1.5rem), dsb.`}
            >
              <Card className="dark:bg-slate-900 dark:border-slate-800">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2">
                    {Object.entries(units).map(([px, rem]) => (
                      <div key={px} className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800 px-2">
                        <span className="text-xs font-semibold text-slate-500">{px}</span>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 bg-aposis-blue-60/30 rounded" style={{ width: `${Math.min(parseFloat(px) * 1.5, 60)}px` }} />
                          <span className="text-xs font-mono font-bold w-20 text-right">{rem}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </DocCard>
          )}

          {/* PANDUAN: MICROSERVICES INTEGRATION */}
          {selectedId === 'microservices' && (
            <DocCard
              title="Integrasi di Repositori Microservices"
              badgeText="Guide"
              description="Langkah-langkah memasang dan mengimpor @aposis/design-system di proyek frontend lain (aposis-fe-v2, dashboard, cms, dll)."
              usageSnippet={`npm install @aposis/design-system`}
            >
              <div className="space-y-6">
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardHeader><CardTitle>1. Instalasi Package</CardTitle></CardHeader>
                  <CardContent>
                    <pre className="p-4 bg-slate-900 text-sky-300 rounded-xl text-xs font-mono overflow-x-auto">
                      npm install @aposis/design-system
                    </pre>
                  </CardContent>
                </Card>

                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardHeader><CardTitle>2. Opsi A: Integrasi Tailwind Preset (Direkomendasikan)</CardTitle></CardHeader>
                  <CardContent>
                    <pre className="p-4 bg-slate-900 text-emerald-300 rounded-xl text-xs font-mono overflow-x-auto">
{`// tailwind.config.js di repo Anda
import aposisPreset from '@aposis/design-system/tailwind.preset';

export default {
  presets: [aposisPreset],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@aposis/design-system/**/*.{js,mjs}'
  ],
};`}
                    </pre>
                  </CardContent>
                </Card>

                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardHeader><CardTitle>3. Opsi B: Standalone Precompiled CSS</CardTitle></CardHeader>
                  <CardContent>
                    <pre className="p-4 bg-slate-900 text-purple-300 rounded-xl text-xs font-mono overflow-x-auto">
{`// src/main.tsx atau App.tsx
import '@aposis/design-system/style.css';`}
                    </pre>
                  </CardContent>
                </Card>

                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardHeader><CardTitle>4. Contoh Impor Komponen</CardTitle></CardHeader>
                  <CardContent>
                    <pre className="p-4 bg-slate-900 text-amber-200 rounded-xl text-xs font-mono overflow-x-auto">
{`import { Button, Input, Badge, Icon, StatCard } from '@aposis/design-system';
import { IconSearch } from '@tabler/icons-react';

export function MyComponent() {
  return (
    <div>
      <StatCard title="Total" value="120" />
      <Button variant="primary" leftIcon={<Icon icon={IconSearch} size="sm" />}>
        Cari
      </Button>
    </div>
  );
}`}
                    </pre>
                  </CardContent>
                </Card>
              </div>
            </DocCard>
          )}
        </main>
      </div>

      {/* Example Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Konfirmasi Penghapusan Data"
        description="Tindakan ini tidak dapat dibatalkan setelah diproses."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button
              variant="danger"
              leftIcon={<Icon icon={IconTrash} size="sm" />}
              onClick={() => {
                alert('Data berhasil dihapus!');
                setIsModalOpen(false);
              }}
            >
              Hapus Sekarang
            </Button>
          </>
        }
      >
        <p>Apakah Anda yakin ingin menghapus catatan data siswa ini dari sistem repositori Aposis?</p>
      </Modal>
    </div>
  );
}
