import React, { useState, useMemo } from 'react';
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
  Link,
  Radio,
  RadioGroup,
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
  IconComponents,
  IconLayout,
  IconCode,
  IconCopy,
  IconCheck,
  IconUsers,
  IconTrendingUp,
  IconSettings,
  IconPlus,
  IconSend,
  IconTrash,
  IconSparkles,
  IconSearch,
  IconHeart,
  IconCalendar,
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
  IconCircleDot,
  IconAlertCircle,
  IconWindow,
  IconMenu2,
  IconX,
  IconArrowRight,
  IconDeviceFloppy,
  IconDownload,
  IconEdit,
  IconChevronDown,
  IconAdjustmentsHorizontal,
  IconInfoCircle,
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
  // Interactive Radio Configurator state
  const [radioConfigVariant, setRadioConfigVariant] = useState<'default' | 'card'>('default');
  const [radioConfigColor, setRadioConfigColor] = useState<'neutral' | 'primary' | 'danger' | 'purple' | 'muted'>('neutral');
  const [radioConfigSize, setRadioConfigSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [radioConfigLabelPos, setRadioConfigLabelPos] = useState<'right' | 'left' | 'bottom' | 'top' | 'none'>('right');
  const [radioConfigMode, setRadioConfigMode] = useState<'group' | 'single'>('group');
  const [radioConfigOrientation, setRadioConfigOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const [radioConfigDisabled, setRadioConfigDisabled] = useState(false);
  const [radioConfigInvalid, setRadioConfigInvalid] = useState(false);
  const [radioConfigHasDesc, setRadioConfigHasDesc] = useState(false);
  const [radioConfigWrapForm, setRadioConfigWrapForm] = useState(false);
  const [radioConfigSelected, setRadioConfigSelected] = useState('opt1');
  const [radioConfigCustomLabel, setRadioConfigCustomLabel] = useState('Pilihan Utama');

  // Interactive Button Configurator state
  const [demoVariant, setDemoVariant] = useState<'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'danger'>('primary');
  const [demoSize, setDemoSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [demoHasLeftIcon, setDemoHasLeftIcon] = useState(true);
  const [demoLeftIconName, setDemoLeftIconName] = useState<string>('IconPlus');
  const [demoHasRightIcon, setDemoHasRightIcon] = useState(false);
  const [demoRightIconName, setDemoRightIconName] = useState<string>('IconArrowRight');
  const [demoCustomId, setDemoCustomId] = useState('btn-simpan');
  const [demoCustomClass, setDemoCustomClass] = useState('');
  const [demoButtonText, setDemoButtonText] = useState('Simpan Perubahan');
  const [demoIsLoading, setDemoIsLoading] = useState(false);
  const [demoIsDisabled, setDemoIsDisabled] = useState(false);

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

  const demoIcons: Record<string, { label: string; icon: any }> = {
    IconPlus: { label: 'Plus (Tambah)', icon: IconPlus },
    IconDeviceFloppy: { label: 'Floppy (Simpan)', icon: IconDeviceFloppy },
    IconSearch: { label: 'Search (Cari)', icon: IconSearch },
    IconDownload: { label: 'Download (Unduh)', icon: IconDownload },
    IconEdit: { label: 'Edit (Ubah)', icon: IconEdit },
    IconArrowRight: { label: 'ArrowRight (Lanjut)', icon: IconArrowRight },
    IconSend: { label: 'Send (Kirim)', icon: IconSend },
    IconTrash: { label: 'Trash (Hapus)', icon: IconTrash },
    IconChevronDown: { label: 'ChevronDown (Dropdown)', icon: IconChevronDown },
    IconSettings: { label: 'Settings (Pengaturan)', icon: IconSettings },
    IconHeart: { label: 'Heart (Favorit)', icon: IconHeart },
  };

  const dynamicButtonCode = useMemo(() => {
    const imports = ['Button'];
    if (demoHasLeftIcon || demoHasRightIcon) imports.push('Icon');

    const iconImports = new Set<string>();
    if (demoHasLeftIcon) iconImports.add(demoLeftIconName);
    if (demoHasRightIcon) iconImports.add(demoRightIconName);

    let res = `import { ${imports.join(', ')} } from '@aposis/design-system';\n`;
    if (iconImports.size > 0) {
      res += `import { ${Array.from(iconImports).join(', ')} } from '@tabler/icons-react';\n`;
    }
    res += `\n<Button`;
    if (demoCustomId.trim()) res += `\n  id="${demoCustomId.trim()}"`;
    if (demoVariant !== 'primary') res += `\n  variant="${demoVariant}"`;
    if (demoSize !== 'md') res += `\n  size="${demoSize}"`;
    if (demoHasLeftIcon) res += `\n  leftIcon={<Icon icon={${demoLeftIconName}} size="${demoSize === 'lg' ? 'md' : 'sm'}" />}`;
    if (demoHasRightIcon) res += `\n  rightIcon={<Icon icon={${demoRightIconName}} size="${demoSize === 'lg' ? 'md' : 'sm'}" />}`;
    if (demoIsLoading) res += `\n  isLoading`;
    if (demoIsDisabled) res += `\n  disabled`;
    if (demoCustomClass.trim()) res += `\n  className="${demoCustomClass.trim()}"`;
    res += `\n>\n  ${demoButtonText}\n</Button>`;
    return res;
  }, [demoVariant, demoSize, demoHasLeftIcon, demoLeftIconName, demoHasRightIcon, demoRightIconName, demoCustomId, demoCustomClass, demoButtonText, demoIsLoading, demoIsDisabled]);

  const dynamicRadioCode = useMemo(() => {
    const isGroup = radioConfigMode === 'group';
    const imports = new Set<string>();
    if (radioConfigWrapForm) imports.add('FormField');
    if (isGroup) imports.add('RadioGroup');
    imports.add('Radio');

    let code = `import React, { useState } from 'react';\nimport { ${Array.from(imports).join(', ')} } from '@aposis/design-system';\n\n`;

    const labelPosAttr =
      radioConfigLabelPos !== 'right' && radioConfigLabelPos !== 'none'
        ? `\n  labelPosition="${radioConfigLabelPos}"`
        : '';
    const colorAttr = radioConfigColor !== 'neutral' ? `\n  color="${radioConfigColor}"` : '';
    const sizeAttr = radioConfigSize !== 'md' ? `\n  size="${radioConfigSize}"` : '';
    const variantAttr = radioConfigVariant !== 'default' ? `\n  variant="${radioConfigVariant}"` : '';
    const disabledAttr = radioConfigDisabled ? `\n  disabled` : '';
    const invalidAttr = radioConfigInvalid ? `\n  isInvalid` : '';

    if (isGroup) {
      code += `// Nilai aktif saat ini: "${radioConfigSelected}"\n`;
      code += `const [selectedValue, setSelectedValue] = useState('${radioConfigSelected}');\n\n`;

      let groupContent = `<RadioGroup\n  name="pilihan"\n  value={selectedValue}\n  onChange={setSelectedValue}`;
      if (radioConfigOrientation !== 'vertical') groupContent += `\n  orientation="${radioConfigOrientation}"`;
      groupContent += `${colorAttr}${sizeAttr}${variantAttr}${labelPosAttr}${disabledAttr}${invalidAttr}`;
      if (radioConfigVariant === 'card') groupContent += `\n  className="grid grid-cols-1 sm:grid-cols-2 gap-3"`;
      groupContent += `\n>\n`;

      const options = [
        { val: 'opt1', label: radioConfigLabelPos === 'none' ? undefined : 'Opsi Pertama', desc: radioConfigHasDesc ? 'Keterangan pembantu untuk opsi 1' : undefined },
        { val: 'opt2', label: radioConfigLabelPos === 'none' ? undefined : 'Opsi Kedua', desc: radioConfigHasDesc ? 'Keterangan pembantu untuk opsi 2' : undefined },
        { val: 'opt3', label: radioConfigLabelPos === 'none' ? undefined : 'Opsi Ketiga', desc: radioConfigHasDesc ? 'Keterangan pembantu untuk opsi 3' : undefined },
      ];

      options.forEach((opt) => {
        groupContent += `  <Radio value="${opt.val}"`;
        if (opt.label) groupContent += ` label="${opt.label}"`;
        else groupContent += ` aria-label="Opsi ${opt.val}"`;
        if (opt.desc && radioConfigLabelPos !== 'none') groupContent += ` description="${opt.desc}"`;
        groupContent += ` />\n`;
      });
      groupContent += `</RadioGroup>`;

      if (radioConfigWrapForm) {
        code += `<FormField\n  label="Pilih Kategori"\n  required\n  helperText="Pilih salah satu opsi yang tersedia"${radioConfigInvalid ? '\n  error="Wajib memilih salah satu opsi"' : ''}\n>\n`;
        code += groupContent.split('\n').map(line => `  ${line}`).join('\n');
        code += `\n</FormField>`;
      } else {
        code += groupContent;
      }
    } else {
      code += `const [checked, setChecked] = useState(${radioConfigSelected === 'opt1'});\n\n`;

      let singleRadio = `<Radio\n  name="demo"\n  value="1"\n  checked={checked}\n  onChange={(e) => setChecked(e.target.checked)}`;
      if (radioConfigLabelPos !== 'none') {
        singleRadio += `\n  label="${radioConfigCustomLabel || 'Pilihan Utama'}"`;
        if (radioConfigHasDesc) singleRadio += `\n  description="Keterangan pembantu di bawah label"`;
      } else {
        singleRadio += `\n  aria-label="${radioConfigCustomLabel || 'Pilihan Utama'}"`;
      }
      singleRadio += `${colorAttr}${sizeAttr}${variantAttr}${labelPosAttr}${disabledAttr}${invalidAttr}\n/>`;

      if (radioConfigWrapForm) {
        code += `<FormField\n  label="Persetujuan"\n  required${radioConfigInvalid ? '\n  error="Harap setujui ketentuan ini"' : ''}\n>\n`;
        code += singleRadio.split('\n').map(line => `  ${line}`).join('\n');
        code += `\n</FormField>`;
      } else {
        code += singleRadio;
      }
    }

    return code;
  }, [
    radioConfigMode,
    radioConfigVariant,
    radioConfigColor,
    radioConfigSize,
    radioConfigLabelPos,
    radioConfigOrientation,
    radioConfigDisabled,
    radioConfigInvalid,
    radioConfigHasDesc,
    radioConfigWrapForm,
    radioConfigCustomLabel,
    radioConfigSelected,
  ]);

  const buttonSnippets = [
    {
      label: 'Dasar',
      desc: 'Penggunaan dasar Button dengan variant dan size standar.',
      code: `import { Button } from '@aposis/design-system';\n\n<Button variant="primary" size="md">Simpan Perubahan</Button>`,
    },
    {
      label: 'Icon di Kiri (leftIcon)',
      desc: 'Tambahkan prop leftIcon={<Icon icon={IconPlus} size="sm" />} untuk meletakkan ikon di sebelah kiri teks.',
      code: `import { Button, Icon } from '@aposis/design-system';\nimport { IconPlus } from '@tabler/icons-react';\n\n<Button\n  variant="primary"\n  leftIcon={<Icon icon={IconPlus} size="sm" />}\n>\n  Tambah Data\n</Button>`,
    },
    {
      label: 'Icon di Kanan (rightIcon)',
      desc: 'Tambahkan prop rightIcon={<Icon icon={IconArrowRight} size="sm" />} untuk tombol aksi atau langkah navigasi.',
      code: `import { Button, Icon } from '@aposis/design-system';\nimport { IconArrowRight } from '@tabler/icons-react';\n\n<Button\n  variant="outline"\n  rightIcon={<Icon icon={IconArrowRight} size="sm" />}\n>\n  Langkah Selanjutnya\n</Button>`,
    },
    {
      label: 'Kedua Icon (Kiri & Kanan)',
      desc: 'Menampilkan ikon di kedua sisi tombol (misal tombol unduh dengan opsi dropdown).',
      code: `import { Button, Icon } from '@aposis/design-system';\nimport { IconDownload, IconChevronDown } from '@tabler/icons-react';\n\n<Button\n  variant="secondary"\n  leftIcon={<Icon icon={IconDownload} size="sm" />}\n  rightIcon={<Icon icon={IconChevronDown} size="sm" />}\n>\n  Export Dokumen\n</Button>`,
    },
    {
      label: 'Cara Ganti Ikon Lain',
      desc: 'Pilih nama ikon dari ribuan pilihan di Tabler Icons lalu import dan pasang ke <Icon icon={...} />.',
      code: `import { Button, Icon } from '@aposis/design-system';\n// 1. Import nama ikon dari library Tabler Icons:\nimport {\n  IconTrash,\n  IconDeviceFloppy,\n  IconSearch,\n  IconSettings,\n  IconDownload\n} from '@tabler/icons-react';\n\n// 2. Tombol Hapus (Merah + Icon Trash):\n<Button variant="danger" leftIcon={<Icon icon={IconTrash} size="sm" />}>\n  Hapus Akun\n</Button>\n\n// 3. Tombol Simpan (Hijau + Icon Disket):\n<Button variant="success" leftIcon={<Icon icon={IconDeviceFloppy} size="sm" />}>\n  Simpan Perubahan\n</Button>\n\n// 4. Tombol Cari (Outline + Icon Kaca Pembesar):\n<Button variant="outline" leftIcon={<Icon icon={IconSearch} size="sm" />}>\n  Cari Siswa\n</Button>`,
    },
    {
      label: 'Kustom id & className',
      desc: 'Tiap atom menerima id unik dan kustom className Tailwind untuk penyesuaian khusus.',
      code: `import { Button, Icon } from '@aposis/design-system';\nimport { IconDeviceFloppy } from '@tabler/icons-react';\n\n<Button\n  id="btn-submit-form"\n  className="w-full shadow-lg hover:shadow-xl hover:scale-[1.02] bg-gradient-to-r from-blue-600 to-indigo-600"\n  leftIcon={<Icon icon={IconDeviceFloppy} size="sm" />}\n>\n  Simpan Data Guru\n</Button>`,
    },
  ];

  const inputSnippets = [
    {
      label: 'Dasar',
      desc: 'Input teks standar',
      code: `import { Input } from '@aposis/design-system';\n\n<Input placeholder="Masukkan nama..." />`,
    },
    {
      label: 'Icon Kiri (leftIcon)',
      desc: 'Menampilkan ikon di sisi kiri input (misal ikon pencarian)',
      code: `import { Input, Icon } from '@aposis/design-system';\nimport { IconSearch } from '@tabler/icons-react';\n\n<Input\n  placeholder="Cari data siswa..."\n  leftIcon={<Icon icon={IconSearch} size="sm" />}\n/>`,
    },
    {
      label: 'Icon Kanan (rightIcon)',
      desc: 'Menampilkan ikon di sisi kanan input (misal indikator status atau aksi)',
      code: `import { Input, Icon } from '@aposis/design-system';\nimport { IconCheck } from '@tabler/icons-react';\n\n<Input\n  placeholder="Email terverifikasi"\n  rightIcon={<Icon icon={IconCheck} size="sm" className="text-emerald-500" />}\n/>`,
    },
    {
      label: 'Kedua Icon',
      desc: 'Menampilkan ikon di sisi kiri dan kanan secara bersamaan',
      code: `import { Input, Icon } from '@aposis/design-system';\nimport { IconUser, IconCheck } from '@tabler/icons-react';\n\n<Input\n  placeholder="Nama pengguna"\n  leftIcon={<Icon icon={IconUser} size="sm" />}\n  rightIcon={<Icon icon={IconCheck} size="sm" className="text-emerald-500" />}\n/>`,
    },
    {
      label: 'Kustom id & className',
      desc: 'Dapat diberikan id unik dan custom styling className Tailwind serta containerClassName',
      code: `import { Input, Icon } from '@aposis/design-system';\nimport { IconSearch } from '@tabler/icons-react';\n\n<Input\n  id="field-search-siswa"\n  className="font-mono border-blue-400 focus:ring-blue-300"\n  containerClassName="max-w-md shadow-sm"\n  leftIcon={<Icon icon={IconSearch} size="sm" />}\n/>`,
    },
  ];

  const iconDocSnippets = [
    {
      label: 'Dasar (Tabler)',
      desc: 'Menggunakan ikon dari Tabler Icons dengan stroke otomatis sesuai ukuran',
      code: `import { Icon } from '@aposis/design-system';\nimport { IconPlus, IconSearch, IconHeart } from '@tabler/icons-react';\n\n<Icon icon={IconPlus} size="md" />\n<Icon icon={IconSearch} size="sm" />`,
    },
    {
      label: 'Standar Ukuran & Stroke',
      desc: 'SM (16px / 1.25px stroke), MD (20px / 1.5px stroke), LG (24px / 2px stroke)',
      code: `import { Icon } from '@aposis/design-system';\nimport { IconPlus } from '@tabler/icons-react';\n\n// SM: 16px (stroke 1.25px)\n<Icon icon={IconPlus} size="sm" />\n\n// MD: 20px (stroke 1.5px)\n<Icon icon={IconPlus} size="md" />\n\n// LG: 24px (stroke 2px)\n<Icon icon={IconPlus} size="lg" />`,
    },
    {
      label: 'Ikon Kustom Figma',
      desc: 'Ikon SVG resmi khusus Aposis (Bahasa ID, Bahasa EN, Rumus Matematika)',
      code: `import { IconLanguageId, IconLanguageEn, IconMathSqrt } from '@aposis/design-system';\n\n<IconLanguageId size="md" />\n<IconLanguageEn size="md" />\n<IconMathSqrt size="md" />`,
    },
    {
      label: 'Kustom id & className',
      desc: 'Bisa diberi id unik, warna semantik, hover effect, atau animasi putar',
      code: `import { Icon } from '@aposis/design-system';\nimport { IconHeart } from '@tabler/icons-react';\n\n<Icon\n  id="favorite-icon"\n  icon={IconHeart}\n  size="lg"\n  className="text-rose-500 hover:text-rose-600 hover:scale-125 cursor-pointer transition-transform"\n/>`,
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
        { id: 'link', label: 'Link', icon: IconArrowRight },
        { id: 'icon', label: 'Icon (Tabler)', icon: IconSparkles },
        { id: 'input', label: 'Input', icon: IconForms },
        { id: 'badge', label: 'Badge', icon: IconIdBadge },
        { id: 'avatar', label: 'Avatar', icon: IconUser },
        { id: 'checkbox', label: 'Checkbox', icon: IconCheckbox },
        { id: 'radio', label: 'Radio', icon: IconCircleDot },
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

  interface SnippetItem {
    label: string;
    code: string;
    desc?: string;
  }

  // Helper component to render component documentation card with multiple snippet tabs
  const DocCard = ({
    title,
    badgeText = 'Atom',
    description,
    usageSnippet,
    snippets,
    tips,
    children,
  }: {
    title: string;
    badgeText?: string;
    description: string;
    usageSnippet?: string;
    snippets?: SnippetItem[];
    tips?: React.ReactNode;
    children: React.ReactNode;
  }) => {
    const allSnippets: SnippetItem[] = snippets && snippets.length > 0
      ? snippets
      : (usageSnippet ? [{ label: 'Kode TSX', code: usageSnippet }] : []);
    const [activeIdx, setActiveIdx] = useState(0);
    const activeItem = allSnippets[activeIdx] || allSnippets[0];

    return (
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

          {/* Tips / Guidance banner */}
          {tips && <div className="mt-4">{tips}</div>}

          {/* Multi-Tab Code Snippet Box */}
          {allSnippets.length > 0 && (
            <div className="mt-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm overflow-hidden">
              <div className="flex flex-wrap items-center justify-between px-3 py-2 border-b border-slate-800 bg-slate-950/70 gap-2">
                <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                  <Icon icon={IconCode} size="sm" className="text-aposis-blue-50 shrink-0 ml-1 mr-1" />
                  {allSnippets.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        activeIdx === idx
                          ? 'bg-aposis-blue-60 text-white shadow-xs'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => copySnippet(activeItem?.code || '')}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-[11px] font-sans font-medium active:scale-95 shrink-0"
                  title="Salin kode ini"
                >
                  {copiedCode ? <Icon icon={IconCheck} size="sm" className="text-emerald-400" /> : <Icon icon={IconCopy} size="sm" />}
                  <span>{copiedCode ? 'Tersalin!' : 'Salin Kode'}</span>
                </button>
              </div>
              {activeItem?.desc && (
                <div className="px-4 py-2 text-xs bg-slate-950/50 text-slate-300 border-b border-slate-800 flex items-center gap-2">
                  <span className="text-aposis-blue-40 font-semibold shrink-0">💡 Cara Pakai:</span>
                  <span>{activeItem.desc}</span>
                </div>
              )}
              <pre className="p-4 overflow-x-auto font-mono text-xs text-sky-300 whitespace-pre leading-relaxed select-all">
                <code>{activeItem?.code}</code>
              </pre>
            </div>
          )}
        </div>

        <div className="pt-2">{children}</div>
      </div>
    );
  };

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
      <div className="flex-1 flex w-full min-h-0 relative">
        {/* Mobile Backdrop Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-30 md:hidden transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Left Sidebar Navigation - Mentok Kiri */}
        <aside
          className={`fixed md:sticky top-[57px] left-0 h-[calc(100vh-57px)] w-72 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 overflow-y-auto z-40 transition-transform duration-200 ${
            isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
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
        <main ref={mainRef} className="flex-1 min-w-0 p-6 sm:p-10 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">
          {/* 1. BUTTON ATOM */}
          {selectedId === 'button' && (
            <DocCard
              title="Button"
              badgeText="Atom"
              description="Komponen tombol aksi resmi Aposis dengan berbagai pilihan varian, ukuran, status loading/disabled, dukungan penempatan ikon (kiri/kanan), serta atribut kustom id & className."
              snippets={buttonSnippets}
              tips={
                <div className="p-4 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200 space-y-2">
                  <div className="font-bold flex items-center gap-1.5 text-sm text-aposis-blue-70 dark:text-aposis-blue-40">
                    <Icon icon={IconInfoCircle} size="sm" />
                    Panduan Lengkap: Mengganti Ikon, Posisi Kiri/Kanan & Kustomisasi
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="bg-white/80 dark:bg-slate-900/60 p-3 rounded-lg border border-blue-100 dark:border-blue-900/40">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">1. Posisi Ikon (Kiri / Kanan)</div>
                      <div className="text-slate-500 dark:text-slate-400 mt-1">Gunakan prop <code className="text-aposis-blue-60 font-semibold">leftIcon</code> atau <code className="text-aposis-blue-60 font-semibold">rightIcon</code>. Anda bisa menyisipkan ikon di sisi kiri, kanan, atau keduanya sekaligus.</div>
                    </div>
                    <div className="bg-white/80 dark:bg-slate-900/60 p-3 rounded-lg border border-blue-100 dark:border-blue-900/40">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">2. Cara Mengganti Ikon</div>
                      <div className="text-slate-500 dark:text-slate-400 mt-1">Import ikon apa pun dari <code className="text-aposis-blue-60 font-semibold">@tabler/icons-react</code> (ribuan ikon tersedia) lalu bungkus ke dalam <code className="text-aposis-blue-60 font-semibold">&lt;Icon icon=&#123;IconNama&#125; size="sm" /&gt;</code>.</div>
                    </div>
                    <div className="bg-white/80 dark:bg-slate-900/60 p-3 rounded-lg border border-blue-100 dark:border-blue-900/40">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">3. Editable: id & className</div>
                      <div className="text-slate-500 dark:text-slate-400 mt-1">Semua atom menerima prop standar seperti <code className="text-aposis-blue-60 font-semibold">id="custom-id"</code> dan tambahan <code className="text-aposis-blue-60 font-semibold">className="..."</code> tanpa merusak style bawaan.</div>
                    </div>
                  </div>
                </div>
              }
            >
              <div className="space-y-6">
                {/* Interactive Live Button Builder */}
                <Card className="dark:bg-slate-900 dark:border-slate-800 border-aposis-blue-200/80 dark:border-blue-900/60 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-blue-50/70 to-indigo-50/50 dark:from-slate-800/80 dark:to-slate-900/80 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Icon icon={IconAdjustmentsHorizontal} size="sm" className="text-aposis-blue-60" />
                          Interactive Button Builder (Coba Ganti Ikon, id & className)
                        </CardTitle>
                        <CardDescription>
                          Ubah konfigurasi di bawah untuk melihat hasil tombol secara langsung dan salin kode TSX yang ter-generate otomatis!
                        </CardDescription>
                      </div>
                      <Badge variant="primary" appearance="solid" size="sm">Live Tester</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    {/* Controls Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                      {/* Left column: Variant, Size, Text */}
                      <div className="space-y-4">
                        <div>
                          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                            1. Pilih Varian Tombol:
                          </label>
                          <div className="flex flex-wrap gap-1.5">
                            {(['primary', 'secondary', 'outline', 'ghost', 'success', 'danger'] as const).map((v) => (
                              <button
                                key={v}
                                type="button"
                                onClick={() => setDemoVariant(v)}
                                className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-all ${
                                  demoVariant === v
                                    ? 'bg-aposis-blue-60 text-white shadow-xs'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                                }`}
                              >
                                {v}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                            2. Pilih Ukuran (Size):
                          </label>
                          <div className="flex gap-2">
                            {(['sm', 'md', 'lg'] as const).map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => setDemoSize(s)}
                                className={`px-3 py-1 rounded-lg uppercase font-medium transition-all ${
                                  demoSize === s
                                    ? 'bg-aposis-blue-60 text-white shadow-xs'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                            3. Teks Tombol:
                          </label>
                          <input
                            type="text"
                            value={demoButtonText}
                            onChange={(e) => setDemoButtonText(e.target.value)}
                            className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none focus:ring-1 focus:ring-aposis-blue-50"
                            placeholder="Teks tombol..."
                          />
                        </div>

                        <div className="flex flex-wrap gap-4 pt-1">
                          <label className="flex items-center gap-1.5 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={demoIsLoading}
                              onChange={(e) => setDemoIsLoading(e.target.checked)}
                              className="rounded text-aposis-blue-60 focus:ring-aposis-blue-50"
                            />
                            <span className="text-slate-700 dark:text-slate-300">Status Loading</span>
                          </label>

                          <label className="flex items-center gap-1.5 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={demoIsDisabled}
                              onChange={(e) => setDemoIsDisabled(e.target.checked)}
                              className="rounded text-aposis-blue-60 focus:ring-aposis-blue-50"
                            />
                            <span className="text-slate-700 dark:text-slate-300">Status Disabled</span>
                          </label>
                        </div>
                      </div>

                      {/* Right column: Icon Kiri, Icon Kanan, ID & className */}
                      <div className="space-y-4">
                        {/* Icon Kiri Toggle & Selector */}
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={demoHasLeftIcon}
                                onChange={(e) => setDemoHasLeftIcon(e.target.checked)}
                                className="rounded text-aposis-blue-60"
                              />
                              <span>Aktifkan Icon Kiri (leftIcon)</span>
                            </label>
                            <Badge variant={demoHasLeftIcon ? 'success' : 'neutral'} appearance="subtle" size="sm">
                              {demoHasLeftIcon ? 'Aktif' : 'Nonaktif'}
                            </Badge>
                          </div>
                          {demoHasLeftIcon && (
                            <div>
                              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Pilih Ikon Kiri dari Tabler:</span>
                              <select
                                value={demoLeftIconName}
                                onChange={(e) => setDemoLeftIconName(e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                              >
                                <option value="IconPlus">IconPlus (Tambah Data)</option>
                                <option value="IconDeviceFloppy">IconDeviceFloppy (Simpan)</option>
                                <option value="IconSearch">IconSearch (Cari)</option>
                                <option value="IconDownload">IconDownload (Unduh)</option>
                                <option value="IconEdit">IconEdit (Ubah)</option>
                                <option value="IconHeart">IconHeart (Suka)</option>
                              </select>
                            </div>
                          )}
                        </div>

                        {/* Icon Kanan Toggle & Selector */}
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={demoHasRightIcon}
                                onChange={(e) => setDemoHasRightIcon(e.target.checked)}
                                className="rounded text-aposis-blue-60"
                              />
                              <span>Aktifkan Icon Kanan (rightIcon)</span>
                            </label>
                            <Badge variant={demoHasRightIcon ? 'success' : 'neutral'} appearance="subtle" size="sm">
                              {demoHasRightIcon ? 'Aktif' : 'Nonaktif'}
                            </Badge>
                          </div>
                          {demoHasRightIcon && (
                            <div>
                              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Pilih Ikon Kanan dari Tabler:</span>
                              <select
                                value={demoRightIconName}
                                onChange={(e) => setDemoRightIconName(e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                              >
                                <option value="IconArrowRight">IconArrowRight (Lanjut)</option>
                                <option value="IconSend">IconSend (Kirim)</option>
                                <option value="IconTrash">IconTrash (Hapus)</option>
                                <option value="IconChevronDown">IconChevronDown (Dropdown)</option>
                                <option value="IconSettings">IconSettings (Pengaturan)</option>
                              </select>
                            </div>
                          )}
                        </div>

                        {/* Custom ID & className inputs */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                              Kustom id:
                            </label>
                            <input
                              type="text"
                              value={demoCustomId}
                              onChange={(e) => setDemoCustomId(e.target.value)}
                              placeholder="misal: btn-submit"
                              className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono"
                            />
                          </div>
                          <div>
                            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                              Kustom className:
                            </label>
                            <input
                              type="text"
                              value={demoCustomClass}
                              onChange={(e) => setDemoCustomClass(e.target.value)}
                              placeholder="misal: shadow-lg"
                              className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Live Preview Area */}
                    <div className="p-5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-3">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Hasil Render Tombol (Live Component):</span>
                      <div className="py-2">
                        <Button
                          id={demoCustomId || undefined}
                          variant={demoVariant}
                          size={demoSize}
                          isLoading={demoIsLoading}
                          disabled={demoIsDisabled}
                          className={demoCustomClass || undefined}
                          leftIcon={demoHasLeftIcon && demoIcons[demoLeftIconName] ? (
                            <Icon icon={demoIcons[demoLeftIconName].icon} size={demoSize === 'lg' ? 'md' : 'sm'} />
                          ) : undefined}
                          rightIcon={demoHasRightIcon && demoIcons[demoRightIconName] ? (
                            <Icon icon={demoIcons[demoRightIconName].icon} size={demoSize === 'lg' ? 'md' : 'sm'} />
                          ) : undefined}
                          onClick={() => alert(`Tombol diklik! id: "${demoCustomId}", variant: "${demoVariant}"`)}
                        >
                          {demoButtonText}
                        </Button>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
                        Coba klik tombol di atas! Atribut <code className="font-mono text-aposis-blue-60">id="{demoCustomId}"</code> dan <code className="font-mono text-aposis-blue-60">className="{demoCustomClass || 'default'}"</code> aktif diaplikasikan.
                      </div>
                    </div>

                    {/* Live Generated TSX Code */}
                    <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xs">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/90 text-xs font-mono text-slate-300">
                        <span className="flex items-center gap-1.5">
                          <Icon icon={IconCode} size="sm" className="text-aposis-blue-40" />
                          Kode TSX Otomatis Ter-generate (Siap Salin):
                        </span>
                        <button
                          type="button"
                          onClick={() => copySnippet(dynamicButtonCode)}
                          className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 text-[11px]"
                        >
                          {copiedCode ? <Icon icon={IconCheck} size="sm" className="text-emerald-400" /> : <Icon icon={IconCopy} size="sm" />}
                          <span>{copiedCode ? 'Tersalin!' : 'Salin Kode Ini'}</span>
                        </button>
                      </div>
                      <pre className="p-4 text-xs font-mono text-sky-300 overflow-x-auto whitespace-pre leading-relaxed select-all">
                        <code>{dynamicButtonCode}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                {/* Real-World Combinations */}
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle>Koleksi Contoh Ikon Kiri & Kanan Populer (Siap Pakai)</CardTitle>
                    <CardDescription>Berbagai skenario umum penempatan ikon dan aksi tombol</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Aksi Tambah (Icon Kiri)</div>
                        <Button variant="primary" size="sm" leftIcon={<Icon icon={IconPlus} size="sm" />}>
                          Tambah Data Siswa
                        </Button>
                      </div>

                      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Aksi Simpan (Icon Kiri)</div>
                        <Button variant="success" size="sm" leftIcon={<Icon icon={IconDeviceFloppy} size="sm" />}>
                          Simpan Perubahan
                        </Button>
                      </div>

                      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Aksi Lanjut (Icon Kanan)</div>
                        <Button variant="outline" size="sm" rightIcon={<Icon icon={IconArrowRight} size="sm" />}>
                          Langkah Berikutnya
                        </Button>
                      </div>

                      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Aksi Kirim (Icon Kanan)</div>
                        <Button variant="primary" size="sm" rightIcon={<Icon icon={IconSend} size="sm" />}>
                          Kirim Pengumuman
                        </Button>
                      </div>

                      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Kedua Sisi (Unduh + Dropdown)</div>
                        <Button variant="secondary" size="sm" leftIcon={<Icon icon={IconDownload} size="sm" />} rightIcon={<Icon icon={IconChevronDown} size="sm" />}>
                          Export Format CSV
                        </Button>
                      </div>

                      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Aksi Hapus (Danger + Icon)</div>
                        <Button variant="danger" size="sm" leftIcon={<Icon icon={IconTrash} size="sm" />}>
                          Hapus Catatan
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Varian Tombol */}
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle>Varian Tombol Standar</CardTitle>
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

                {/* Ukuran Tombol */}
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

                {/* Status & Loading */}
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle>Status Loading &amp; Disabled</CardTitle>
                    <CardDescription>Indikator proses latar belakang dan status nonaktif</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button isLoading>Sedang Memproses...</Button>
                      <Button disabled>Disabled Button</Button>
                      <Button variant="outline" disabled>Outline Disabled</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </DocCard>
          )}

          {/* LINK ATOM */}
          {selectedId === 'link' && (
            <DocCard
              title="Link"
              badgeText="Atom"
              description="Komponen tautan navigasi resmi Aposis v3 dengan dukungan panah arah (kiri/kanan/none), 5 palet warna Tailwind, 3 variasi ukuran, gaya garis bawah (default/underlined), serta status disabled."
              snippets={[
                {
                  label: 'Penggunaan Dasar',
                  desc: 'Tautan standar dengan prop to atau href, dan panah terintegrasi.',
                  code: `import { Link } from '@aposis/design-system';\n\n<Link to="/dashboard" arrow="right">Lihat Dashboard</Link>\n<Link to="/kembali" arrow="left">Kembali</Link>`,
                },
                {
                  label: 'Palet Warna (color / c)',
                  desc: 'Pilihan warna berbasis Tailwind: primary, danger, neutral, purple, dan muted.',
                  code: `import { Link } from '@aposis/design-system';\n\n<Link to="#" color="primary" arrow="right">Primary Blue</Link>\n<Link to="#" color="danger" arrow="right">Danger Red</Link>\n<Link to="#" color="neutral" arrow="right">Neutral Dark</Link>\n<Link to="#" color="purple" arrow="right">Purple Violet</Link>\n<Link to="#" color="muted" arrow="right">Muted Gray</Link>`,
                },
                {
                  label: 'Underlined vs Default',
                  desc: 'Gunakan variant="underlined" untuk tautan yang selalu memiliki garis bawah.',
                  code: `import { Link } from '@aposis/design-system';\n\n<Link to="#" variant="default">Underline saat hover</Link>\n<Link to="#" variant="underlined">Selalu bergaris bawah</Link>`,
                },
              ]}
            >
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Matriks Palet Warna & Arah Panah</CardTitle>
                    <CardDescription>
                      Tiap warna disandingkan dengan panah kanan, panah kiri, teks biasa, gaya bergaris bawah, dan status disabled.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="overflow-x-auto p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
                      <table className="w-full min-w-[640px] text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                            <th className="pb-3 pr-4">Tema Warna</th>
                            <th className="pb-3 px-4">Panah Kanan</th>
                            <th className="pb-3 px-4">Panah Kiri</th>
                            <th className="pb-3 px-4">Tanpa Panah</th>
                            <th className="pb-3 px-4">Underlined</th>
                            <th className="pb-3 pl-4">Disabled</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                          {/* 1. Primary Blue */}
                          <tr>
                            <td className="py-3.5 pr-4 text-xs font-semibold text-slate-500">Primary (Blue)</td>
                            <td className="py-3.5 px-4"><Link to="#" color="primary" arrow="right">Link</Link></td>
                            <td className="py-3.5 px-4"><Link to="#" color="primary" arrow="left">Link</Link></td>
                            <td className="py-3.5 px-4"><Link to="#" color="primary">Link</Link></td>
                            <td className="py-3.5 px-4"><Link to="#" color="primary" variant="underlined">Link</Link></td>
                            <td className="py-3.5 pl-4"><Link to="#" color="primary" disabled arrow="right">Link</Link></td>
                          </tr>

                          {/* 2. Danger Red */}
                          <tr>
                            <td className="py-3.5 pr-4 text-xs font-semibold text-slate-500">Danger (Red)</td>
                            <td className="py-3.5 px-4"><Link to="#" color="danger" arrow="right">Link</Link></td>
                            <td className="py-3.5 px-4"><Link to="#" color="danger" arrow="left">Link</Link></td>
                            <td className="py-3.5 px-4"><Link to="#" color="danger">Link</Link></td>
                            <td className="py-3.5 px-4"><Link to="#" color="danger" variant="underlined">Link</Link></td>
                            <td className="py-3.5 pl-4"><Link to="#" color="danger" disabled arrow="right">Link</Link></td>
                          </tr>

                          {/* 3. Neutral Dark */}
                          <tr>
                            <td className="py-3.5 pr-4 text-xs font-semibold text-slate-500">Neutral (Dark)</td>
                            <td className="py-3.5 px-4"><Link to="#" color="neutral" arrow="right">Link</Link></td>
                            <td className="py-3.5 px-4"><Link to="#" color="neutral" arrow="left">Link</Link></td>
                            <td className="py-3.5 px-4"><Link to="#" color="neutral">Link</Link></td>
                            <td className="py-3.5 px-4"><Link to="#" color="neutral" variant="underlined">Link</Link></td>
                            <td className="py-3.5 pl-4"><Link to="#" color="neutral" disabled arrow="right">Link</Link></td>
                          </tr>

                          {/* 4. Purple Violet */}
                          <tr>
                            <td className="py-3.5 pr-4 text-xs font-semibold text-slate-500">Purple (Violet)</td>
                            <td className="py-3.5 px-4"><Link to="#" color="purple" arrow="right">Link</Link></td>
                            <td className="py-3.5 px-4"><Link to="#" color="purple" arrow="left">Link</Link></td>
                            <td className="py-3.5 px-4"><Link to="#" color="purple">Link</Link></td>
                            <td className="py-3.5 px-4"><Link to="#" color="purple" variant="underlined">Link</Link></td>
                            <td className="py-3.5 pl-4"><Link to="#" color="purple" disabled arrow="right">Link</Link></td>
                          </tr>

                          {/* 5. Muted Gray */}
                          <tr>
                            <td className="py-3.5 pr-4 text-xs font-semibold text-slate-500">Muted (Gray)</td>
                            <td className="py-3.5 px-4"><Link to="#" color="muted" arrow="right">Link</Link></td>
                            <td className="py-3.5 px-4"><Link to="#" color="muted" arrow="left">Link</Link></td>
                            <td className="py-3.5 px-4"><Link to="#" color="muted">Link</Link></td>
                            <td className="py-3.5 px-4"><Link to="#" color="muted" variant="underlined">Link</Link></td>
                            <td className="py-3.5 pl-4"><Link to="#" color="muted" disabled arrow="right">Link</Link></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Skala Ukuran */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Perbandingan Ukuran (sm, md, lg)</div>
                      <div className="flex flex-wrap items-center gap-8">
                        <div className="space-y-1">
                          <span className="text-[11px] text-slate-400 block font-mono">size="lg" (16px)</span>
                          <Link to="#" size="lg" arrow="right">Link Action Large</Link>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[11px] text-slate-400 block font-mono">size="md" (14px - Default)</span>
                          <Link to="#" size="md" arrow="right">Link Action Medium</Link>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[11px] text-slate-400 block font-mono">size="sm" (12px)</span>
                          <Link to="#" size="sm" arrow="right">Link Action Small</Link>
                        </div>
                      </div>
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
              description="Standar komponen ikon Aposis berbasis Tabler Icons dengan ketebalan garis (stroke width) proporsional resmi: SM (16px / 1.25px), MD (20px / 1.5px), LG (24px / 2px), serta ikon khusus Figma."
              snippets={iconDocSnippets}
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
              snippets={inputSnippets}
              tips={
                <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200">
                  <div className="font-semibold mb-1 flex items-center gap-1.5">
                    <Icon icon={IconInfoCircle} size="sm" />
                    Penempatan Ikon & Kustomisasi Input:
                  </div>
                  Gunakan prop <code className="text-aposis-blue-60 font-semibold">leftIcon</code> atau <code className="text-aposis-blue-60 font-semibold">rightIcon</code> untuk menyisipkan ikon. Anda juga dapat memberikan atribut <code className="text-aposis-blue-60 font-semibold">id="input-id"</code>, <code className="text-aposis-blue-60 font-semibold">className="..."</code>, dan <code className="text-aposis-blue-60 font-semibold">containerClassName="..."</code>.
                </div>
              }
            >
              <Card className="dark:bg-slate-900 dark:border-slate-800">
                <CardContent className="pt-6 space-y-5">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                      1. Input Normal (Kustom id & className)
                    </label>
                    <Input
                      id="input-nama-lengkap"
                      placeholder="Masukkan nama lengkap..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="dark:bg-slate-800 dark:border-slate-700 dark:text-white font-sans"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">id="input-nama-lengkap"</span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                      2. Input dengan Icon Kiri (leftIcon)
                    </label>
                    <Input
                      id="input-search-siswa"
                      placeholder="Cari siswa berdasarkan NISN atau nama..."
                      leftIcon={<Icon icon={IconSearch} size="sm" />}
                      className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                      3. Input dengan Icon Kanan (rightIcon)
                    </label>
                    <Input
                      id="input-email-status"
                      defaultValue="ahmad.fauzi@aposis.sch.id"
                      rightIcon={<Icon icon={IconCheck} size="sm" className="text-emerald-500" />}
                      className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                      4. Input dengan Kedua Icon (Kiri & Kanan)
                    </label>
                    <Input
                      id="input-user-verified"
                      placeholder="Username sistem..."
                      defaultValue="ahmad_fauzi"
                      leftIcon={<Icon icon={IconUser} size="sm" />}
                      rightIcon={<Icon icon={IconCheck} size="sm" className="text-emerald-500" />}
                      className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                      5. Input dengan Status Error
                    </label>
                    <Input
                      id="input-email-error"
                      placeholder="email@domain.com"
                      defaultValue="email-salah-format"
                      error="Format alamat email tidak valid"
                      leftIcon={<Icon icon={IconAlertCircle} size="sm" className="text-rose-500" />}
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

          {/* RADIO ATOM */}
          {selectedId === 'radio' && (
            <DocCard
              title="Radio"
              badgeText="Atom"
              description="Elemen pilihan tunggal aksesibel berbasis Tailwind CSS murni dengan dukungan orientasi label (kanan, kiri, bawah, atas), varian card, 5 palet warna, dan RadioGroup helper."
            >
              <div className="space-y-6">
                {/* 1. Interactive Live Radio Builder */}
                <Card className="dark:bg-slate-900 dark:border-slate-800 border-aposis-blue-200/80 dark:border-blue-900/60 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-blue-50/70 to-indigo-50/50 dark:from-slate-800/80 dark:to-slate-900/80 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Icon icon={IconAdjustmentsHorizontal} size="sm" className="text-aposis-blue-60" />
                          Interactive Radio Builder (Pilih Varian, Posisi Label & Warna)
                        </CardTitle>
                        <CardDescription>
                          Pilih konfigurasi di bawah untuk melihat preview interaktif secara langsung dan salin kode TSX yang ter-generate otomatis!
                        </CardDescription>
                      </div>
                      <Badge variant="primary" appearance="solid" size="sm">Live Tester</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    {/* Controls Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                      {/* Left column: Variant, Color, Size, LabelPosition */}
                      <div className="space-y-4">
                        <div>
                          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                            1. Pilih Varian Tampilan:
                          </label>
                          <div className="flex flex-wrap gap-1.5">
                            {(['default', 'card'] as const).map((v) => (
                              <button
                                key={v}
                                type="button"
                                onClick={() => setRadioConfigVariant(v)}
                                className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-all cursor-pointer ${
                                  radioConfigVariant === v
                                    ? 'bg-aposis-blue-60 text-white shadow-xs'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                              >
                                {v === 'default' ? 'Lingkaran Biasa (Default)' : 'Varian Kartu (Card)'}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                            2. Pilih Palet Warna (color / c):
                          </label>
                          <div className="flex flex-wrap gap-1.5">
                            {(
                              [
                                { id: 'neutral', label: 'Neutral (Slate)', dot: 'bg-slate-900 dark:bg-white' },
                                { id: 'primary', label: 'Primary (Blue)', dot: 'bg-blue-600' },
                                { id: 'danger', label: 'Danger (Red)', dot: 'bg-red-600' },
                                { id: 'purple', label: 'Purple (Violet)', dot: 'bg-purple-600' },
                                { id: 'muted', label: 'Muted (Gray)', dot: 'bg-slate-500' },
                              ] as const
                            ).map((c) => (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => setRadioConfigColor(c.id)}
                                className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                                  radioConfigColor === c.id
                                    ? 'bg-aposis-blue-60 text-white shadow-xs'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                              >
                                <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                                <span>{c.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                            3. Pilih Ukuran (Size):
                          </label>
                          <div className="flex gap-2">
                            {(['sm', 'md', 'lg'] as const).map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => setRadioConfigSize(s)}
                                className={`px-3 py-1 rounded-lg uppercase font-medium transition-all cursor-pointer ${
                                  radioConfigSize === s
                                    ? 'bg-aposis-blue-60 text-white shadow-xs'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                              >
                                {s === 'sm' ? 'SM (16px)' : s === 'md' ? 'MD (20px)' : 'LG (24px)'}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                            4. Posisi Label (labelPosition):
                          </label>
                          <div className="flex flex-wrap gap-1.5">
                            {(
                              [
                                { id: 'right', label: 'Kanan (Default)' },
                                { id: 'left', label: 'Kiri' },
                                { id: 'bottom', label: 'Bawah (Stacked)' },
                                { id: 'top', label: 'Atas' },
                                { id: 'none', label: 'Tanpa Label (Circle Only)' },
                              ] as const
                            ).map((pos) => (
                              <button
                                key={pos.id}
                                type="button"
                                onClick={() => setRadioConfigLabelPos(pos.id)}
                                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                                  radioConfigLabelPos === pos.id
                                    ? 'bg-aposis-blue-60 text-white shadow-xs'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                              >
                                {pos.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right column: Mode, Orientation, Toggles, Custom Label */}
                      <div className="space-y-4">
                        <div>
                          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                            5. Mode Komponen:
                          </label>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setRadioConfigMode('group')}
                              className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                                radioConfigMode === 'group'
                                  ? 'bg-aposis-blue-60 text-white shadow-xs'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                              }`}
                            >
                              RadioGroup (Multi-opsi)
                            </button>
                            <button
                              type="button"
                              onClick={() => setRadioConfigMode('single')}
                              className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                                radioConfigMode === 'single'
                                  ? 'bg-aposis-blue-60 text-white shadow-xs'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                              }`}
                            >
                              Single Radio (Atom)
                            </button>
                          </div>
                        </div>

                        {radioConfigMode === 'group' && (
                          <div>
                            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                              6. Orientasi Susunan Grup:
                            </label>
                            <div className="flex gap-2">
                              {(['horizontal', 'vertical'] as const).map((ori) => (
                                <button
                                  key={ori}
                                  type="button"
                                  onClick={() => setRadioConfigOrientation(ori)}
                                  className={`px-3 py-1 rounded-lg capitalize font-medium transition-all cursor-pointer ${
                                    radioConfigOrientation === ori
                                      ? 'bg-aposis-blue-60 text-white shadow-xs'
                                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                  }`}
                                >
                                  {ori}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
                          <span className="font-semibold text-slate-800 dark:text-slate-200 block text-[11px] uppercase tracking-wider">
                            7. Status & Opsi Tambahan:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <label className="flex items-center gap-1.5 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={radioConfigDisabled}
                                onChange={(e) => setRadioConfigDisabled(e.target.checked)}
                                className="rounded text-aposis-blue-60 focus:ring-aposis-blue-50"
                              />
                              <span className="text-slate-700 dark:text-slate-300">Status Disabled</span>
                            </label>

                            <label className="flex items-center gap-1.5 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={radioConfigInvalid}
                                onChange={(e) => setRadioConfigInvalid(e.target.checked)}
                                className="rounded text-aposis-blue-60 focus:ring-aposis-blue-50"
                              />
                              <span className="text-slate-700 dark:text-slate-300">Status Error (isInvalid)</span>
                            </label>

                            <label className="flex items-center gap-1.5 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={radioConfigHasDesc}
                                onChange={(e) => setRadioConfigHasDesc(e.target.checked)}
                                className="rounded text-aposis-blue-60 focus:ring-aposis-blue-50"
                              />
                              <span className="text-slate-700 dark:text-slate-300">Sertakan Deskripsi</span>
                            </label>

                            <label className="flex items-center gap-1.5 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={radioConfigWrapForm}
                                onChange={(e) => setRadioConfigWrapForm(e.target.checked)}
                                className="rounded text-aposis-blue-60 focus:ring-aposis-blue-50"
                              />
                              <span className="text-slate-700 dark:text-slate-300">Bungkus FormField</span>
                            </label>
                          </div>
                        </div>

                        {radioConfigLabelPos !== 'none' && (
                          <div>
                            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                              8. Kustom Teks Label:
                            </label>
                            <input
                              type="text"
                              value={radioConfigCustomLabel}
                              onChange={(e) => setRadioConfigCustomLabel(e.target.value)}
                              className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none focus:ring-1 focus:ring-aposis-blue-50"
                              placeholder="Teks label radio..."
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Live Preview Area */}
                    <div className="p-6 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-4">
                      <div className="flex items-center justify-between w-full border-b border-slate-200/80 dark:border-slate-700/80 pb-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Hasil Render Radio (Live Component):
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Pilihan Aktif: <strong className="font-mono text-blue-600 dark:text-blue-400">{radioConfigSelected}</strong>
                        </span>
                      </div>

                      <div className="py-2 w-full flex justify-center">
                        {radioConfigWrapForm ? (
                          <FormField
                            label="Pilih Kategori Layanan"
                            required
                            helperText="Silakan tentukan salah satu opsi untuk melanjutkan proses."
                            error={radioConfigInvalid ? 'Wajib memilih salah satu opsi layanan.' : undefined}
                            className="max-w-lg"
                          >
                            {radioConfigMode === 'group' ? (
                              <RadioGroup
                                name="interactive_builder_radio"
                                value={radioConfigSelected}
                                onChange={(val) => setRadioConfigSelected(val)}
                                color={radioConfigColor}
                                size={radioConfigSize}
                                variant={radioConfigVariant}
                                orientation={radioConfigOrientation}
                                labelPosition={radioConfigLabelPos === 'none' ? 'right' : radioConfigLabelPos}
                                disabled={radioConfigDisabled}
                                isInvalid={radioConfigInvalid}
                                className={radioConfigVariant === 'card' ? 'grid grid-cols-1 sm:grid-cols-2 gap-3 w-full' : undefined}
                              >
                                <Radio
                                  value="opt1"
                                  label={radioConfigLabelPos === 'none' ? undefined : (radioConfigCustomLabel || 'Opsi Pertama')}
                                  aria-label={radioConfigLabelPos === 'none' ? 'Opsi Pertama' : undefined}
                                  description={radioConfigHasDesc && radioConfigLabelPos !== 'none' ? 'Keterangan pembantu untuk opsi 1' : undefined}
                                />
                                <Radio
                                  value="opt2"
                                  label={radioConfigLabelPos === 'none' ? undefined : 'Opsi Kedua'}
                                  aria-label={radioConfigLabelPos === 'none' ? 'Opsi Kedua' : undefined}
                                  description={radioConfigHasDesc && radioConfigLabelPos !== 'none' ? 'Keterangan pembantu untuk opsi 2' : undefined}
                                />
                                <Radio
                                  value="opt3"
                                  label={radioConfigLabelPos === 'none' ? undefined : 'Opsi Ketiga'}
                                  aria-label={radioConfigLabelPos === 'none' ? 'Opsi Ketiga' : undefined}
                                  description={radioConfigHasDesc && radioConfigLabelPos !== 'none' ? 'Keterangan pembantu untuk opsi 3' : undefined}
                                />
                              </RadioGroup>
                            ) : (
                              <Radio
                                name="interactive_single_radio"
                                value="opt1"
                                checked={radioConfigSelected === 'opt1'}
                                onChange={() => setRadioConfigSelected(radioConfigSelected === 'opt1' ? '' : 'opt1')}
                                color={radioConfigColor}
                                size={radioConfigSize}
                                variant={radioConfigVariant}
                                labelPosition={radioConfigLabelPos === 'none' ? 'right' : radioConfigLabelPos}
                                label={radioConfigLabelPos === 'none' ? undefined : (radioConfigCustomLabel || 'Pilihan Utama')}
                                aria-label={radioConfigLabelPos === 'none' ? 'Pilihan Utama' : undefined}
                                description={radioConfigHasDesc && radioConfigLabelPos !== 'none' ? 'Keterangan pembantu di bawah label' : undefined}
                                disabled={radioConfigDisabled}
                                isInvalid={radioConfigInvalid}
                              />
                            )}
                          </FormField>
                        ) : radioConfigMode === 'group' ? (
                          <RadioGroup
                            name="interactive_builder_radio"
                            value={radioConfigSelected}
                            onChange={(val) => setRadioConfigSelected(val)}
                            color={radioConfigColor}
                            size={radioConfigSize}
                            variant={radioConfigVariant}
                            orientation={radioConfigOrientation}
                            labelPosition={radioConfigLabelPos === 'none' ? 'right' : radioConfigLabelPos}
                            disabled={radioConfigDisabled}
                            isInvalid={radioConfigInvalid}
                            className={radioConfigVariant === 'card' ? 'grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg' : undefined}
                          >
                            <Radio
                              value="opt1"
                              label={radioConfigLabelPos === 'none' ? undefined : (radioConfigCustomLabel || 'Opsi Pertama')}
                              aria-label={radioConfigLabelPos === 'none' ? 'Opsi Pertama' : undefined}
                              description={radioConfigHasDesc && radioConfigLabelPos !== 'none' ? 'Keterangan pembantu untuk opsi 1' : undefined}
                            />
                            <Radio
                              value="opt2"
                              label={radioConfigLabelPos === 'none' ? undefined : 'Opsi Kedua'}
                              aria-label={radioConfigLabelPos === 'none' ? 'Opsi Kedua' : undefined}
                              description={radioConfigHasDesc && radioConfigLabelPos !== 'none' ? 'Keterangan pembantu untuk opsi 2' : undefined}
                            />
                            <Radio
                              value="opt3"
                              label={radioConfigLabelPos === 'none' ? undefined : 'Opsi Ketiga'}
                              aria-label={radioConfigLabelPos === 'none' ? 'Opsi Ketiga' : undefined}
                              description={radioConfigHasDesc && radioConfigLabelPos !== 'none' ? 'Keterangan pembantu untuk opsi 3' : undefined}
                            />
                          </RadioGroup>
                        ) : (
                          <Radio
                            name="interactive_single_radio"
                            value="opt1"
                            checked={radioConfigSelected === 'opt1'}
                            onChange={() => setRadioConfigSelected(radioConfigSelected === 'opt1' ? '' : 'opt1')}
                            color={radioConfigColor}
                            size={radioConfigSize}
                            variant={radioConfigVariant}
                            labelPosition={radioConfigLabelPos === 'none' ? 'right' : radioConfigLabelPos}
                            label={radioConfigLabelPos === 'none' ? undefined : (radioConfigCustomLabel || 'Pilihan Utama')}
                            aria-label={radioConfigLabelPos === 'none' ? 'Pilihan Utama' : undefined}
                            description={radioConfigHasDesc && radioConfigLabelPos !== 'none' ? 'Keterangan pembantu di bawah label' : undefined}
                            disabled={radioConfigDisabled}
                            isInvalid={radioConfigInvalid}
                          />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
                        Coba klik pilihan di atas untuk menguji respons visual, orientasi label, warna, dan status error secara langsung!
                      </div>
                    </div>

                    {/* Live Generated TSX Code */}
                    <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xs">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/90 text-xs font-mono text-slate-300">
                        <span className="flex items-center gap-1.5">
                          <Icon icon={IconCode} size="sm" className="text-aposis-blue-40" />
                          Kode TSX Otomatis Ter-generate (Siap Salin):
                        </span>
                        <button
                          type="button"
                          onClick={() => copySnippet(dynamicRadioCode)}
                          className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 text-[11px] cursor-pointer"
                        >
                          {copiedCode ? <Icon icon={IconCheck} size="sm" className="text-emerald-400" /> : <Icon icon={IconCopy} size="sm" />}
                          <span>{copiedCode ? 'Tersalin!' : 'Salin Kode Ini'}</span>
                        </button>
                      </div>
                      <pre className="p-4 text-xs font-mono text-sky-300 overflow-x-auto whitespace-pre leading-relaxed select-all">
                        <code>{dynamicRadioCode}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                {/* 2. Real-World Presets / Skenario Populer */}
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle>Koleksi Contoh Skenario Populer (Siap Pakai)</CardTitle>
                    <CardDescription>
                      Preset siap pakai untuk varian card interaktif dan orientasi stacked vertikal sesuai board Figma.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Preset 1: Card Selector */}
                      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Preset 1: Pilihan Peran Akun (Card Variant)
                          </span>
                          <Badge variant="primary" size="sm">Varian Card</Badge>
                        </div>
                        <RadioGroup defaultValue="teacher" orientation="vertical" className="gap-2.5">
                          <Radio
                            variant="card"
                            value="teacher"
                            label="Tenaga Pendidik"
                            description="Input nilai, absensi, dan jadwal mengajar harian"
                          />
                          <Radio
                            variant="card"
                            value="staff"
                            label="Staf Tata Usaha"
                            description="Pengelolaan arsip surat dan administrasi sekolah"
                          />
                        </RadioGroup>
                      </div>

                      {/* Preset 2: Stacked Vertical (Figma Board) */}
                      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Preset 2: Posisi Label Bawah (Stacked Vertikal)
                          </span>
                          <Badge variant="neutral" size="sm">Figma 53-3380</Badge>
                        </div>
                        <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                          <RadioGroup defaultValue="sem1" orientation="horizontal" className="justify-around py-2">
                            <Radio value="sem1" labelPosition="bottom" label="Semester 1" />
                            <Radio value="sem2" labelPosition="bottom" label="Semester 2" />
                            <Radio value="pend" labelPosition="bottom" label="Remedial" />
                          </RadioGroup>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Sangat cocok untuk tata letak ringkas horizontal dengan teks yang berpusat di bawah lingkaran radio.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
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
                  <FormField label="Status Keaktifan Akademik" required helperText="Pilih salah satu status administratif siswa">
                    <RadioGroup name="student_status_demo" defaultValue="aktif" orientation="horizontal">
                      <Radio value="aktif" label="Aktif" />
                      <Radio value="cuti" label="Cuti Akademik" />
                      <Radio value="pindah" label="Pindah Sekolah" />
                    </RadioGroup>
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
          </div>
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
