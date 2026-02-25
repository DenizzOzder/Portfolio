import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs, doc, writeBatch, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { TechStackItem } from '@/types/techstack';
import toast from 'react-hot-toast';

// Auto-resolve tech name → Devicon CDN path
const TECH_ICON_MAP: Record<string, string> = {
  'html': 'html5/html5-original.svg',
  'html5': 'html5/html5-original.svg',
  'html/css': 'html5/html5-original.svg',
  'css': 'css3/css3-original.svg',
  'css3': 'css3/css3-original.svg',
  'javascript': 'javascript/javascript-original.svg',
  'js': 'javascript/javascript-original.svg',
  'typescript': 'typescript/typescript-original.svg',
  'ts': 'typescript/typescript-original.svg',
  'react': 'react/react-original.svg',
  'reactjs': 'react/react-original.svg',
  'react native': 'react/react-original.svg',
  'next.js': 'nextjs/nextjs-original.svg',
  'nextjs': 'nextjs/nextjs-original.svg',
  'vue': 'vuejs/vuejs-original.svg',
  'vuejs': 'vuejs/vuejs-original.svg',
  'angular': 'angular/angular-original.svg',
  'svelte': 'svelte/svelte-original.svg',
  'node.js': 'nodejs/nodejs-original.svg',
  'nodejs': 'nodejs/nodejs-original.svg',
  'express': 'express/express-original.svg',
  'expressjs': 'express/express-original.svg',
  'python': 'python/python-original.svg',
  'java': 'java/java-original.svg',
  'c#': 'csharp/csharp-original.svg',
  'csharp': 'csharp/csharp-original.svg',
  'c++': 'cplusplus/cplusplus-original.svg',
  'cpp': 'cplusplus/cplusplus-original.svg',
  'go': 'go/go-original.svg',
  'golang': 'go/go-original.svg',
  'rust': 'rust/rust-original.svg',
  'php': 'php/php-original.svg',
  'ruby': 'ruby/ruby-original.svg',
  'swift': 'swift/swift-original.svg',
  'kotlin': 'kotlin/kotlin-original.svg',
  'dart': 'dart/dart-original.svg',
  'flutter': 'flutter/flutter-original.svg',
  'mongodb': 'mongodb/mongodb-original.svg',
  'mysql': 'mysql/mysql-original.svg',
  'postgresql': 'postgresql/postgresql-original.svg',
  'postgres': 'postgresql/postgresql-original.svg',
  'sql': 'mysql/mysql-original.svg',
  'sql server': 'microsoftsqlserver/microsoftsqlserver-plain.svg',
  'redis': 'redis/redis-original.svg',
  'firebase': 'firebase/firebase-plain.svg',
  'docker': 'docker/docker-original.svg',
  'kubernetes': 'kubernetes/kubernetes-plain.svg',
  'aws': 'amazonwebservices/amazonwebservices-original-wordmark.svg',
  'git': 'git/git-original.svg',
  'github': 'github/github-original.svg',
  'gitlab': 'gitlab/gitlab-original.svg',
  'figma': 'figma/figma-original.svg',
  'tailwind': 'tailwindcss/tailwindcss-original.svg',
  'tailwindcss': 'tailwindcss/tailwindcss-original.svg',
  'bootstrap': 'bootstrap/bootstrap-original.svg',
  'sass': 'sass/sass-original.svg',
  'scss': 'sass/sass-original.svg',
  'webpack': 'webpack/webpack-original.svg',
  'vite': 'vitejs/vitejs-original.svg',
  'postman': 'postman/postman-original.svg',
  'vercel': 'vercel/vercel-original.svg',
  'visual studio': 'visualstudio/visualstudio-plain.svg',
  'vscode': 'vscode/vscode-original.svg',
  'linux': 'linux/linux-original.svg',
  'graphql': 'graphql/graphql-plain.svg',
  'rest api': 'azuresqldatabase/azuresqldatabase-original.svg',
  'office': 'microsoftsqlserver/microsoftsqlserver-plain.svg',
};

function resolveIconName(name: string): string | undefined {
  const key = name.toLowerCase().trim();
  return TECH_ICON_MAP[key];
}

const DEVICON_CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';

const AdminTechStack: React.FC = () => {
  const [items, setItems] = useState<TechStackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const q = query(collection(db, 'techstacks'), orderBy('sortOrder', 'asc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as TechStackItem[];
      setItems(data);
    } catch (error) {
      toast.error('Tech stack yüklenirken hata oluştu.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add techs from comma-separated input
  const handleAdd = () => {
    if (!inputValue.trim()) return;

    const newTechs = inputValue
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .filter(s => !items.some(item => item.name.toLowerCase() === s.toLowerCase()));

    if (newTechs.length === 0) {
      toast.error('Bu teknolojiler zaten listede var.');
      return;
    }

    const newItems: TechStackItem[] = newTechs.map((name, i) => ({
      name,
      iconName: resolveIconName(name),
      sortOrder: items.length + i + 1,
    }));

    setItems(prev => [...prev, ...newItems]);
    setInputValue('');
    toast.success(`${newTechs.length} teknoloji eklendi (kaydetmeyi unutmayın!)`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  // Drag and Drop handlers
  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const reordered = [...items];
    const [dragged] = reordered.splice(dragItem.current, 1);
    reordered.splice(dragOverItem.current, 0, dragged);
    // Recalculate sortOrder
    const updated = reordered.map((item, i) => ({ ...item, sortOrder: i + 1 }));
    setItems(updated);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  // Save all items to Firestore (batch write)
  const handleSaveAll = async () => {
    setIsSaving(true);
    const loadingToast = toast.loading('Tech stack kaydediliyor...');

    try {
      // 1. Delete all existing docs
      const snapshot = await getDocs(collection(db, 'techstacks'));
      const batch1 = writeBatch(db);
      snapshot.docs.forEach(d => batch1.delete(d.ref));
      await batch1.commit();

      // 2. Write all current items
      const batch2 = writeBatch(db);
      items.forEach((item, i) => {
        const ref = doc(collection(db, 'techstacks'));
        batch2.set(ref, {
          name: item.name,
          iconName: item.iconName || null,
          sortOrder: i + 1,
        });
      });
      await batch2.commit();

      toast.success('Tech stack başarıyla kaydedildi!', { id: loadingToast });
      fetchItems();
    } catch (error) {
      console.error(error);
      toast.error('Kaydedilemedi.', { id: loadingToast });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="text-white">Yükleniyor...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-white mb-2">Teknoloji Yığını</h2>
          <p className="text-gray-400">Ana sayfadaki tech stack piramidini buradan yönetebilirsiniz.</p>
        </div>
        <button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50"
        >
          {isSaving ? 'Kaydediliyor...' : 'Tümünü Kaydet'}
        </button>
      </div>

      {/* Add Input */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <label className="block text-sm font-bold text-gray-300 mb-3">
          Yeni Teknoloji Ekle <span className="text-gray-500 font-normal">(virgülle ayırarak birden fazla ekleyebilirsiniz)</span>
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="TypeScript, Firebase, Docker"
            className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600"
          />
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-purple-600/20 text-purple-400 font-bold rounded-xl hover:bg-purple-600/30 transition-colors whitespace-nowrap"
          >
            + Ekle
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          SVG ikonlar otomatik eşleştirilir. Sürükle-bırak ile sıralama yapabilirsiniz.
        </p>
      </div>

      {/* Tech Stack List with Drag & Drop */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">
          Mevcut Teknolojiler <span className="text-gray-500 font-normal text-sm">({items.length} adet)</span>
        </h3>

        {items.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400">Henüz teknoloji eklenmemiş.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragEnd={handleDragEnd}
                onDragOver={e => e.preventDefault()}
                className="flex items-center gap-4 px-4 py-3 rounded-xl bg-black/20 border border-white/5 hover:border-purple-500/30 hover:bg-white/5 transition-all cursor-grab active:cursor-grabbing group"
              >
                {/* Drag Handle */}
                <span className="text-gray-600 group-hover:text-gray-400 select-none text-lg" title="Sürükle">
                  ⠿
                </span>

                {/* Sort Order Badge */}
                <span className="text-xs text-gray-500 bg-white/5 w-7 h-7 flex items-center justify-center rounded-lg font-bold shrink-0">
                  {index + 1}
                </span>

                {/* Icon Preview */}
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  {item.iconName ? (
                    <img
                      src={`${DEVICON_CDN}${item.iconName}`}
                      alt={item.name}
                      className="w-6 h-6"
                      onError={e => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <span className="text-gray-500 text-xs font-bold">—</span>
                  )}
                </div>

                {/* Name */}
                <span className="text-white font-medium flex-1">{item.name}</span>

                {/* Icon Status */}
                {item.iconName ? (
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                    İkon ✓
                  </span>
                ) : (
                  <span className="text-xs text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-md">
                    İkon yok
                  </span>
                )}

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(index)}
                  className="p-1.5 text-red-400 hover:text-white hover:bg-red-500 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Kaldır"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTechStack;
