import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { Carousel } from '@/components/Carousel';
import { TypeCards } from '@/components/TypeCards';
import { TemplateCard } from '@/components/TemplateCard';
import { templates } from '@/data/templates';
import { trackPageView, trackPageLeave } from '@/lib/tracking';

const Templates = () => {
  useEffect(() => {
    trackPageView('templates');
    return () => trackPageLeave('templates');
  }, []);

  const featuredTemplates = templates.filter((t) => t.isFeatured);
  const recommendedTemplates = templates;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12">
        {/* Featured Carousel */}
        <section className="mb-12 text-center">
          <h1 className="mb-8 text-2xl font-bold md:text-3xl">
            회원님을 위한 추천 템플릿
          </h1>
          <Carousel templates={featuredTemplates} />
        </section>

        {/* Search Bar */}
        <section className="mx-auto mb-12 max-w-3xl">
          <SearchBar size="large" />
        </section>

        {/* Type Cards */}
        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">타입 별로 보기</h2>
            <Link
              to="/templates"
              className="text-sm text-primary hover:underline"
            >
              더보기
            </Link>
          </div>
          <TypeCards />
        </section>

        {/* Recommended Templates */}
        <section>
          <h2 className="mb-6 text-lg font-semibold">취향이 담은 사람들의 추천</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {recommendedTemplates.map((template) => (
              <div key={template.id} className="w-full">
                <TemplateCard
                  template={template}
                  size="medium"
                  showLike
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2024 MiriCanvas. 모든 권리 보유.</p>
        </div>
      </footer>
    </div>
  );
};

export default Templates;
