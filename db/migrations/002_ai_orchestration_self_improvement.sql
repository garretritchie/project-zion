-- Cost-aware AI orchestration and GitHub/Codex self-improvement foundation.

create table if not exists ai_providers (
  id uuid primary key default gen_random_uuid(),
  provider_id text not null unique,
  provider_name text not null,
  provider_type text not null,
  enabled boolean not null default false,
  default_model text not null,
  fallback_model text,
  cost_tier text not null default 'low',
  supports_streaming boolean not null default false,
  supports_tools boolean not null default false,
  supports_vision boolean not null default false,
  supports_audio boolean not null default false,
  supports_code_execution boolean not null default false,
  supports_long_context boolean not null default false,
  supports_agent_mode boolean not null default false,
  supports_structured_output boolean not null default false,
  max_context_tokens integer,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint ai_providers_type_chk check (provider_type in ('openai','openai_codex','anthropic','google_gemini','local','other')),
  constraint ai_providers_cost_chk check (cost_tier in ('low','medium','high','premium'))
);

create table if not exists agent_profiles (
  id uuid primary key default gen_random_uuid(),
  agent_key text not null unique,
  agent_name text not null,
  purpose text not null,
  default_provider_id text references ai_providers(provider_id),
  default_model text,
  escalation_provider_id text references ai_providers(provider_id),
  risk_ceiling integer not null default 2,
  can_use_tools boolean not null default false,
  can_create_development_requests boolean not null default false,
  requires_approval_above_level integer not null default 3,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists model_routing_rules (
  id uuid primary key default gen_random_uuid(),
  intent text not null,
  execution_mode text not null,
  preferred_agent text not null,
  preferred_provider_id text not null references ai_providers(provider_id),
  fallback_provider_id text references ai_providers(provider_id),
  required_capabilities_json jsonb not null default '[]'::jsonb,
  min_risk_level integer not null default 0,
  max_risk_level integer not null default 2,
  approval_required boolean not null default false,
  estimated_cost_tier text not null default 'low',
  enabled boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint model_routing_rules_cost_chk check (estimated_cost_tier in ('low','medium','high','premium'))
);

create table if not exists ai_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  default_fast_provider_id text not null references ai_providers(provider_id),
  default_smart_provider_id text references ai_providers(provider_id),
  default_coding_provider_id text references ai_providers(provider_id),
  default_long_document_provider_id text references ai_providers(provider_id),
  default_multimodal_provider_id text references ai_providers(provider_id),
  ask_before_high_cost_model boolean not null default true,
  monthly_ai_budget numeric(10,2) not null default 100.00,
  warn_at_budget_percent integer not null default 80,
  disable_premium_models_without_approval boolean not null default true,
  prefer_fast_model_by_default boolean not null default true,
  log_token_usage boolean not null default true,
  show_cost_estimates boolean not null default true,
  require_approval_above_risk_level integer not null default 2,
  allow_voice_created_development_requests boolean not null default true,
  allow_automatic_github_issue_creation boolean not null default false,
  allow_automatic_branch_creation boolean not null default false,
  allow_automatic_pr_creation boolean not null default false,
  allow_automatic_merge boolean not null default false,
  allow_production_deployment boolean not null default false,
  allow_production_data_changes boolean not null default false,
  require_sentinel_review_for_level_5 boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists provider_usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  request_id uuid,
  agent_key text,
  intent text,
  execution_mode text,
  provider_id text references ai_providers(provider_id),
  model text,
  risk_level integer not null default 0,
  estimated_input_tokens integer,
  estimated_output_tokens integer,
  actual_input_tokens integer,
  actual_output_tokens integer,
  estimated_cost numeric(10,6),
  actual_cost numeric(10,6),
  model_selection_reason text,
  status text not null default 'planned',
  created_at timestamptz not null default now(),
  constraint provider_usage_logs_status_chk check (status in ('planned','started','completed','failed','suppressed','approval_required'))
);

create table if not exists development_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  title text not null,
  original_user_input text not null,
  normalized_request text not null,
  source text not null default 'text',
  target_area text,
  priority text not null default 'medium',
  status text not null default 'captured',
  assigned_agent text not null default 'Operator',
  recommended_provider text not null default 'Codex',
  requires_approval boolean not null default true,
  production_write_allowed boolean not null default false,
  acceptance_criteria jsonb not null default '[]'::jsonb,
  constraints_json jsonb not null default '[]'::jsonb,
  github_issue_url text,
  branch_name text,
  pull_request_url text,
  preview_url text,
  sentinel_review_status text not null default 'not_requested',
  github_issue_body text,
  codex_prompt text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint development_requests_source_chk check (source in ('voice','text','system')),
  constraint development_requests_priority_chk check (priority in ('low','medium','high','critical')),
  constraint development_requests_status_chk check (status in ('captured','clarified','ready_for_github','github_issue_created','ready_for_codex','in_progress','preview_ready','sentinel_review','approved','rejected','completed'))
);

create index if not exists idx_ai_settings_user on ai_settings (user_id);
create index if not exists idx_provider_usage_logs_user_created on provider_usage_logs (user_id, created_at desc);
create index if not exists idx_development_requests_user_status on development_requests (user_id, status);
create index if not exists idx_model_routing_rules_intent on model_routing_rules (intent, enabled);

alter table ai_settings enable row level security;
alter table provider_usage_logs enable row level security;
alter table development_requests enable row level security;

drop policy if exists ai_settings_owner_access on ai_settings;
create policy ai_settings_owner_access on ai_settings
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists provider_usage_logs_owner_access on provider_usage_logs;
create policy provider_usage_logs_owner_access on provider_usage_logs
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists development_requests_owner_access on development_requests;
create policy development_requests_owner_access on development_requests
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

insert into ai_providers (
  provider_id, provider_name, provider_type, enabled, default_model, fallback_model, cost_tier,
  supports_streaming, supports_tools, supports_vision, supports_audio, supports_code_execution,
  supports_long_context, supports_agent_mode, supports_structured_output, max_context_tokens, notes
) values
  ('openai_fast_chat','OpenAI Fast Chat','openai',true,'gpt-5.4-nano','gpt-5.4-mini','low',true,true,false,false,false,false,false,true,null,'Default for normal chat, simple tasks, memory capture, dashboard Q&A, reminders, and short summaries.'),
  ('openai_smart_chat','OpenAI Smart Chat','openai',true,'gpt-5.4-mini','gpt-5.4','medium',true,true,true,false,false,true,false,true,null,'Escalation tier for business writing, planning, structured analysis, and more complex reasoning.'),
  ('openai_codex_operator','OpenAI Codex / Operator','openai_codex',false,'gpt-5.3-codex',null,'high',true,true,false,false,true,true,true,true,null,'Coding, repo review, bug fixes, tests, app improvement, and GitHub issue/branch/PR workflows.'),
  ('claude_long_document','Claude Long Document Specialist','anthropic',false,'claude-haiku-4.5',null,'medium',true,true,false,false,false,true,false,true,null,'Planned specialist for long document review, careful writing, and nuanced analysis.'),
  ('gemini_multimodal','Gemini Multimodal Specialist','google_gemini',false,'gemini-flash-lite',null,'medium',true,true,true,true,false,true,false,true,null,'Planned specialist for multimodal, Google Workspace, image, video, and long-context document workflows.')
on conflict (provider_id) do nothing;

insert into agent_profiles (
  agent_key, agent_name, purpose, default_provider_id, default_model, escalation_provider_id,
  risk_ceiling, can_use_tools, can_create_development_requests, requires_approval_above_level
) values
  ('oracle','Oracle','Router, governance, risk classifier, and model selector.','openai_fast_chat','gpt-5.4-nano','openai_smart_chat',5,true,true,2),
  ('zion','Zion','Personal operating assistant and dashboard layer.','openai_fast_chat','gpt-5.4-nano','openai_smart_chat',2,true,false,3),
  ('operator','Operator','Code, build, GitHub, and self-improvement agent.','openai_codex_operator','gpt-5.3-codex',null,5,true,true,2),
  ('sentinel','Sentinel','Security, permission, regression, and approval reviewer.','openai_smart_chat','gpt-5.4-mini','openai_smart_chat',6,true,false,2),
  ('architect','Architect','System design and technical planning.','openai_smart_chat','gpt-5.4-mini','openai_smart_chat',4,true,false,3),
  ('archivist','Archivist','Memory, knowledge, and file organization.','openai_fast_chat','gpt-5.4-nano','openai_smart_chat',3,true,false,3),
  ('scout','Scout','Research, watch items, and monitoring.','openai_fast_chat','gpt-5.4-nano','gemini_multimodal',3,true,false,3),
  ('creative','Creative','Content, campaign, image, and visual workflows.','openai_smart_chat','gpt-5.4-mini','gemini_multimodal',3,true,false,3),
  ('analyst','Analyst','Reports, comparisons, business analysis, and KPI work.','openai_smart_chat','gpt-5.4-mini','openai_smart_chat',4,true,false,3),
  ('concierge','Concierge','Calendar, email, reminders, and daily workflow.','openai_fast_chat','gpt-5.4-nano','openai_smart_chat',3,true,false,2)
on conflict (agent_key) do nothing;

insert into model_routing_rules (
  intent, execution_mode, preferred_agent, preferred_provider_id, fallback_provider_id,
  required_capabilities_json, min_risk_level, max_risk_level, approval_required, estimated_cost_tier, notes
) values
  ('general_chat','answer_now','Zion','openai_fast_chat','openai_smart_chat','["chat"]',0,1,false,'low','Normal back-and-forth starts on the cheapest fast model.'),
  ('dashboard_query','answer_now','Zion','openai_fast_chat','openai_smart_chat','["chat","structured_output"]',0,1,false,'low','Dashboard Q&A and simple summaries.'),
  ('business_analysis','draft_only','Analyst','openai_smart_chat','openai_fast_chat','["structured_output","reasoning"]',1,3,false,'medium','Business planning and structured analysis.'),
  ('document_review','draft_only','Scout','claude_long_document','openai_smart_chat','["long_context"]',1,3,true,'medium','Long document review if specialist provider is enabled.'),
  ('multimodal_analysis','draft_only','Scout','gemini_multimodal','openai_smart_chat','["vision","long_context"]',1,3,true,'medium','Image/video/document understanding when enabled.'),
  ('app_improvement','development_request','Operator','openai_codex_operator','openai_smart_chat','["code_execution","agent_mode"]',5,5,true,'high','Voice/text improvement requests become development requests.'),
  ('bug_report','development_request','Operator','openai_codex_operator','openai_smart_chat','["code_execution","agent_mode"]',5,5,true,'high','Code-impacting bug reports route to Operator/Codex.'),
  ('security_review','approval_required','Sentinel','openai_smart_chat','openai_fast_chat','["reasoning","structured_output"]',4,6,true,'medium','Security, permission, production, and destructive actions require review.')
on conflict do nothing;
