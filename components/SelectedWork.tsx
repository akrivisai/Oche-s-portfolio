'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Reveal } from './Reveal';
import { PROJECTS, type Project, type ProjectCaseBlock } from '@/lib/content';

function CaseBlock({ block }: { block: ProjectCaseBlock }) {
  if (block.type === 'prose') {
    return (
      <>
        <h4>{block.heading}</h4>
        <p>{block.body}</p>
      </>
    );
  }
  return (
    <>
      <h4>{block.heading}</h4>
      <ul className="case-list">
        {block.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal as="article">
      <div className="project" data-open={open ? 'true' : 'false'}>
        <div className="project-head">
          <span className="project-num">{project.num}</span>
          <div className="project-title-wrap">
            <div className="project-role">{project.role}</div>
            <h3 className="project-title">
              {project.title}
              {project.subtitle ? (
                <span className="subtitle"> {project.subtitle}</span>
              ) : null}
            </h3>
            <p className="project-summary">{project.summary}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="project-expand"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span>{open ? 'Collapse' : 'Expand'}</span>
            <Plus strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
        <div
          className="project-body"
          aria-hidden={!open}
          style={open ? { maxHeight: '4000px' } : { maxHeight: 0 }}
        >
          <div className="project-body-inner">
            <div className="case-block">
              {project.leftBlocks.map((b, i) => (
                <CaseBlock key={i} block={b} />
              ))}
            </div>
            <div className="case-block">
              {project.rightBlocks.map((b, i) => (
                <CaseBlock key={i} block={b} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function SelectedWork() {
  return (
    <section className="block" id="work">
      <div className="container">
        <Reveal as="header" className="section-head">
          <div className="eyebrow">Selected Work</div>
          <h2>
            Systems I have <span className="italic">shipped.</span>
          </h2>
          <p className="lede">
            Four production platforms built inside Babban Gona to solve real
            operational bottlenecks across recruitment, training, and approvals.
          </p>
        </Reveal>

        <div className="projects">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.num} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
