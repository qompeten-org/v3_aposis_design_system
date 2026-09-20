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
  Atom,
  Boxes,
  Layout,
  Code2,
  Copy,
  Check,
  Users,
  GraduationCap,
  School,
  TrendingUp,
  Settings,
  Plus,
  Send,
  Trash2,
  Sparkles,
} from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState('atoms');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [tablePage, setTablePage] = useState(1);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Form states
  const [inputValue, setInputValue] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(true);

  const copyCode = (code: string, section: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard', active: true },
    { id: 'students', label: 'Siswa' },
    { id: 'reports', label: 'Laporan' },
    { id: 'settings', label: 'Pengaturan' },
  ];

  const sidebarGroups = [
    {
      title: 'Menu Utama',
      items: [
        { id: '1', label: 'Ringkasan', icon: <Boxes className="w-4 h-4" />, active: true },
        { id: '2', label: 'Peserta Didik', icon: <Users className="w-4 h-4" />, badge: <Badge size="sm" variant="primary">580</Badge> },
        { id: '3', label: 'Lembaga / Sekolah', icon: <School className="w-4 h-4" /> },
      ],
    },
    {
      title: 'Akademik & Nilai',
      items: [
        { id: '4', label: 'Tes Minat Bakat', icon: <GraduationCap className="w-4 h-4" /> },
        { id: '5', label: 'Statistik Perkembangan', icon: <TrendingUp className="w-4 h-4" /> },
      ],
    },
    {
      title: 'Sistem',
      items: [
        { id: '6', label: 'Konfigurasi', icon: <Settings className="w-4 h-4" /> },
      ],
    },
  ];

  const studentColumns: Column<StudentData>[] = [
    {
      key: 'name',
      header: 'Nama Siswa',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={row.name} size="sm" />
          <div>
            <div className="font-semibold text-slate-800">{row.name}</div>
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
      render: (row) => <span className="font-bold text-slate-800">{row.gpa.toFixed(2)}</span>,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Sleek Design System Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-aposis-600 to-sky-400 flex items-center justify-center text-white font-black text-sm shadow-sm">
            v3
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 tracking-tight">Aposis Design System</span>
              <Badge variant="primary" appearance="subtle" size="sm">
                @aposis/design-system
              </Badge>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Atomic UI Component Library for Microservices & Multi-Repo
            </p>
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex items-center gap-1">
          <Tabs
            items={[
              { id: 'atoms', label: 'Atoms', icon: <Atom className="w-3.5 h-3.5" /> },
              { id: 'molecules', label: 'Molecules', icon: <Boxes className="w-3.5 h-3.5" /> },
              { id: 'organisms', label: 'Organisms', icon: <Layout className="w-3.5 h-3.5" /> },
              { id: 'microservices', label: 'Integrasi Microservices', icon: <Code2 className="w-3.5 h-3.5" /> },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="pills"
          />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Tab 1: Atoms Showcase */}
        {activeTab === 'atoms' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Buttons Showcase */}
            <Card>
              <CardHeader>
                <CardTitle>Buttons (Atom)</CardTitle>
                <CardDescription>Varian tombol, ukuran, loading states, dan ikon penunjang</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Text variant="small" weight="semibold" className="text-slate-700 mb-3">Varian Tombol</Text>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="danger">Danger</Button>
                  </div>
                </div>

                <div>
                  <Text variant="small" weight="semibold" className="text-slate-700 mb-3">Ukuran (Sizes)</Text>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small (sm)</Button>
                    <Button size="md">Medium (md)</Button>
                    <Button size="lg">Large (lg)</Button>
                  </div>
                </div>

                <div>
                  <Text variant="small" weight="semibold" className="text-slate-700 mb-3">States & Icons</Text>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button leftIcon={<Plus className="w-4 h-4" />}>Dengan Icon Kiri</Button>
                    <Button rightIcon={<Send className="w-4 h-4" />} variant="outline">Icon Kanan</Button>
                    <Button isLoading>Memproses...</Button>
                    <Button disabled>Disabled Button</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inputs & Form Elements */}
            <Card>
              <CardHeader>
                <CardTitle>Inputs & Checkboxes (Atom)</CardTitle>
                <CardDescription>Komponen masukan teks, status error, dan seleksi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Text variant="small" weight="semibold" className="mb-1.5 text-slate-700">Input Standar</Text>
                    <Input
                      placeholder="Masukkan nama lengkap..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </div>

                  <div>
                    <Text variant="small" weight="semibold" className="mb-1.5 text-slate-700">Input dengan Error</Text>
                    <Input
                      placeholder="email@domain.com"
                      defaultValue="invalid-email"
                      error="Format email tidak valid"
                    />
                  </div>
                </div>

                <div>
                  <Text variant="small" weight="semibold" className="mb-2 text-slate-700">Checkboxes</Text>
                  <div className="space-y-3">
                    <Checkbox
                      checked={checkboxChecked}
                      onChange={(e) => setCheckboxChecked(e.target.checked)}
                      label="Kirimkan notifikasi email ketika ada pembaruan data"
                      description="Anda dapat mengubah preferensi ini kapan saja di pengaturan profil."
                    />
                    <Checkbox
                      label="Saya menyetujui syarat dan ketentuan penggunaan sistem Aposis"
                    />
                    <Checkbox
                      disabled
                      checked
                      label="Fitur enkripsi end-to-end (Wajib aktif secara sistem)"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badges, Avatars, Spinners */}
            <Card>
              <CardHeader>
                <CardTitle>Badges, Avatars & Spinners (Atom)</CardTitle>
                <CardDescription>Indikator status, foto profil, dan animasi pemuatan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Text variant="small" weight="semibold" className="mb-2 text-slate-700">Badges</Text>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="success" dot>Success</Badge>
                    <Badge variant="warning" dot>Warning</Badge>
                    <Badge variant="danger" dot>Danger</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="neutral">Neutral</Badge>
                    <Badge variant="primary" appearance="solid">Solid Badge</Badge>
                    <Badge variant="success" appearance="outline">Outline</Badge>
                  </div>
                </div>

                <div>
                  <Text variant="small" weight="semibold" className="mb-2 text-slate-700">Avatars</Text>
                  <div className="flex items-center gap-4">
                    <Avatar name="Ahmad Fauzi" size="xs" status="online" />
                    <Avatar name="Budi Santoso" size="sm" status="away" />
                    <Avatar name="Citra Kirana" size="md" status="busy" />
                    <Avatar name="Dewi Lestari" size="lg" status="online" />
                    <Avatar name="Eko Prasetyo" size="xl" status="offline" />
                  </div>
                </div>

                <div>
                  <Text variant="small" weight="semibold" className="mb-2 text-slate-700">Spinners</Text>
                  <div className="flex items-center gap-4">
                    <Spinner size="xs" />
                    <Spinner size="sm" />
                    <Spinner size="md" />
                    <Spinner size="lg" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tab 2: Molecules Showcase */}
        {activeTab === 'molecules' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <Card>
              <CardHeader>
                <CardTitle>SearchBar & FormField (Molecule)</CardTitle>
                <CardDescription>Kombinasi input dengan label, icon, dan validasi terpadu</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Text variant="small" weight="semibold" className="mb-2 text-slate-700">Search Bar</Text>
                  <SearchBar
                    placeholder="Cari data, menu, atau informasi..."
                    onSearch={(query) => alert(`Mencari: ${query}`)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <FormField
                    label="Nomor Induk Siswa Nasional (NISN)"
                    required
                    helperText="10 digit angka resmi dari Kemdikbud"
                  >
                    <Input placeholder="Contoh: 0051283921" />
                  </FormField>

                  <FormField
                    label="Kata Sandi Baru"
                    required
                    error="Kata sandi minimal 8 karakter"
                  >
                    <Input type="password" placeholder="••••••••" />
                  </FormField>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alerts & Modal Dialog (Molecule)</CardTitle>
                <CardDescription>Notifikasi kontekstual dan jendela interaksi pengguna</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isAlertVisible && (
                  <Alert
                    variant="info"
                    title="Pembaruan Sistem Tersedia"
                    onClose={() => setIsAlertVisible(false)}
                  >
                    Versi 3.0 dari Aposis Design System telah dimuat. Silakan sinkronkan dependensi di repo Anda.
                  </Alert>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Alert variant="success" title="Sinkronisasi Berhasil">
                    Data berhasil diperbarui secara otomatis.
                  </Alert>
                  <Alert variant="warning" title="Perhatian">
                    Koneksi database mengalami latensi tinggi.
                  </Alert>
                  <Alert variant="danger" title="Gagal Menyimpan">
                    Token autentikasi sesi telah kedaluwarsa.
                  </Alert>
                </div>

                <div className="pt-4">
                  <Button onClick={() => setIsModalOpen(true)}>
                    Buka Contoh Modal Dialog
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tab 3: Organisms Showcase */}
        {activeTab === 'organisms' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            {/* Navbar Organism Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Navbar (Organism)</CardTitle>
                <CardDescription>Header aplikasi dengan logo, navigasi, badge notifikasi, dan profil pengguna</CardDescription>
              </CardHeader>
              <CardContent className="p-0 border-t border-slate-100 overflow-hidden rounded-b-2xl">
                <Navbar
                  brandName="Aposis Portal"
                  brandLogo={
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-aposis-600 to-sky-400 flex items-center justify-center text-white font-black text-sm shadow-md">
                      v3
                    </div>
                  }
                  navLinks={navLinks}
                  user={{
                    name: 'Administrator Aposis',
                    email: 'admin@aposis.id',
                  }}
                  notificationCount={3}
                  onNotificationClick={() => alert('Notifikasi diklik!')}
                  actions={
                    <Button size="sm" variant="outline">
                      Bantuan
                    </Button>
                  }
                />
              </CardContent>
            </Card>

            {/* StatCard Organism Preview */}
            <Card>
              <CardHeader>
                <CardTitle>StatCard (Organism)</CardTitle>
                <CardDescription>Komponen kartu metrik dashboard dengan indikator tren naik/turun dan ikon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard
                    title="Total Siswa Aktif"
                    value="12,840"
                    change={{ value: '+14.2%', trend: 'up', label: 'vs bulan lalu' }}
                    icon={<Users className="w-5 h-5 text-aposis-600" />}
                  />
                  <StatCard
                    title="Sekolah Terdaftar"
                    value="142"
                    change={{ value: '+8', trend: 'up', label: 'sekolah baru' }}
                    icon={<School className="w-5 h-5 text-emerald-600" />}
                    iconBg="bg-emerald-50"
                  />
                  <StatCard
                    title="Tes Selesai"
                    value="34,290"
                    change={{ value: '-2.1%', trend: 'down', label: 'vs pekan lalu' }}
                    icon={<GraduationCap className="w-5 h-5 text-amber-600" />}
                    iconBg="bg-amber-50"
                  />
                  <StatCard
                    title="Tingkat Akurasi"
                    value="99.4%"
                    change={{ value: 'Stabil', trend: 'neutral' }}
                    icon={<Sparkles className="w-5 h-5 text-purple-600" />}
                    iconBg="bg-purple-50"
                  />
                </div>
              </CardContent>
            </Card>

            {/* DataTable Organism Preview */}
            <Card>
              <CardHeader className="flex sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>DataTable (Organism)</CardTitle>
                  <CardDescription>Tabel data fleksibel dengan kolom kustom, status badge, dan kontrol paginasi</CardDescription>
                </div>
                <Button size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                  Tambah Data
                </Button>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            {/* Sidebar Navigation Organism */}
            <Card>
              <CardHeader>
                <CardTitle>Sidebar Navigation (Organism)</CardTitle>
                <CardDescription>Menu samping navigasi aplikasi dengan dukungan collapse</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  >
                    {sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                  </Button>
                </div>

                <div className="h-96 rounded-2xl overflow-hidden border border-slate-700 flex shadow-inner">
                  <Sidebar
                    groups={sidebarGroups}
                    collapsed={sidebarCollapsed}
                    header={
                      <div className="flex items-center gap-2 text-white font-bold">
                        <div className="w-6 h-6 rounded-lg bg-aposis-600 flex items-center justify-center text-xs">
                          A
                        </div>
                        {!sidebarCollapsed && <span>Aposis V3</span>}
                      </div>
                    }
                    footer={
                      <div className="flex items-center gap-2">
                        <Avatar name="Admin User" size="sm" status="online" />
                        {!sidebarCollapsed && (
                          <div className="truncate text-xs">
                            <div className="font-semibold text-white">Admin Portal</div>
                            <div className="text-[10px] text-slate-400">admin@aposis.id</div>
                          </div>
                        )}
                      </div>
                    }
                  />
                  <div className="flex-1 bg-slate-100 p-6 flex items-center justify-center text-slate-400 text-sm">
                    Area Konten Aplikasi (Workspace)
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card Organism Structure */}
            <Card>
              <CardHeader>
                <CardTitle>Card (Organism)</CardTitle>
                <CardDescription>Komponen kartu modular dengan subkomponen Header, Content, dan Footer</CardDescription>
              </CardHeader>
              <CardContent>
                <Card hoverable className="max-w-md">
                  <CardHeader>
                    <CardTitle>Judul Kartu</CardTitle>
                    <CardDescription>Deskripsi singkat kartu untuk menjelaskan isinya.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Text variant="body">
                      Ini adalah contoh isi dari komponen <code>CardContent</code>. Sangat fleksibel dan dapat diisi elemen apapun.
                    </Text>
                  </CardContent>
                  <CardFooter>
                    <span className="text-xs text-slate-400">Status: Tersimpan</span>
                    <Button size="sm">Aksi Kartu</Button>
                  </CardFooter>
                </Card>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tab 4: Microservices Integration Guide */}
        {activeTab === 'microservices' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Panduan Penggunaan di Repo Microservices Lain</CardTitle>
                <CardDescription>
                  Cara menginstal dan mengintegrasikan <code>@aposis/design-system</code> di repository frontend Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Step 1 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-aposis-700 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-aposis-100 text-aposis-700 flex items-center justify-center text-xs">1</span>
                      Install Package di Repo Target
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyCode('npm install @aposis/design-system', 'step1')}
                      leftIcon={copiedSection === 'step1' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    >
                      {copiedSection === 'step1' ? 'Disalin!' : 'Salin'}
                    </Button>
                  </div>
                  <pre className="p-4 bg-slate-900 text-sky-300 rounded-xl text-xs overflow-x-auto font-mono">
                    npm install @aposis/design-system
                  </pre>
                  <p className="text-xs text-slate-500">
                    Atau gunakan <code>npm link @aposis/design-system</code> saat pengembangan lokal.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-aposis-700 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-aposis-100 text-aposis-700 flex items-center justify-center text-xs">2</span>
                      Opsi A: Integrasi Tailwind Config (Direkomendasikan untuk Repo Tailwind)
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyCode(
`// tailwind.config.js
import aposisPreset from '@aposis/design-system/tailwind.preset';

export default {
  presets: [aposisPreset],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@aposis/design-system/**/*.{js,mjs}'
  ],
};`, 'step2')}
                      leftIcon={copiedSection === 'step2' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    >
                      {copiedSection === 'step2' ? 'Disalin!' : 'Salin'}
                    </Button>
                  </div>
                  <pre className="p-4 bg-slate-900 text-emerald-300 rounded-xl text-xs overflow-x-auto font-mono">
{`// tailwind.config.js
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
                </div>

                {/* Step 3 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-aposis-700 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-aposis-100 text-aposis-700 flex items-center justify-center text-xs">3</span>
                      Opsi B: Langsung Impor Precompiled CSS (Zero-Config)
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyCode("import '@aposis/design-system/style.css';", 'step3')}
                      leftIcon={copiedSection === 'step3' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    >
                      {copiedSection === 'step3' ? 'Disalin!' : 'Salin'}
                    </Button>
                  </div>
                  <pre className="p-4 bg-slate-900 text-purple-300 rounded-xl text-xs overflow-x-auto font-mono">
{`// src/main.tsx atau src/App.tsx
import '@aposis/design-system/style.css';`}
                  </pre>
                </div>

                {/* Step 4 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-aposis-700 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-aposis-100 text-aposis-700 flex items-center justify-center text-xs">4</span>
                      Impor & Pakai Komponen
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyCode(
`import { Button, Badge, FormField, Input, StatCard } from '@aposis/design-system';

export function Dashboard() {
  return (
    <div>
      <StatCard title="Total Siswa" value="1,240" />
      <Button variant="primary">Simpan Perubahan</Button>
    </div>
  );
}`, 'step4')}
                      leftIcon={copiedSection === 'step4' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    >
                      {copiedSection === 'step4' ? 'Disalin!' : 'Salin'}
                    </Button>
                  </div>
                  <pre className="p-4 bg-slate-900 text-amber-200 rounded-xl text-xs overflow-x-auto font-mono">
{`import { Button, Badge, FormField, Input, StatCard } from '@aposis/design-system';

export function Dashboard() {
  return (
    <div>
      <StatCard title="Total Siswa" value="1,240" />
      <Button variant="primary">Simpan Perubahan</Button>
    </div>
  );
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

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
              leftIcon={<Trash2 className="w-4 h-4" />}
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

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <p>© 2026 Aposis Design System. Dibangun untuk ekosistem microservices Aposis.</p>
      </footer>
    </div>
  );
}
