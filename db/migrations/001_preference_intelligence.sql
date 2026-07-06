-- Global Preference Intelligence foundation.
-- Replace auth.uid() policies if the production auth pattern uses a tenant/user join.

create extension if not exists pgcrypto;

create table if not exists preference_memories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  container_key text not null,
  scope text not null,
  domain text not null,
  category text,
  preference_type text not null,
  subject text,
  object_label text,
  summary text not null,
  reason text,
  strength text not null default 'medium',
  confidence numeric(4,3) not null default 0.500,
  traits_json jsonb not null default '[]'::jsonb,
  constraints_json jsonb not null default '{}'::jsonb,
  examples_json jsonb not null default '[]'::jsonb,
  source_type text not null default 'user_approved',
  source_reference text,
  permission_level text not null default 'approved_memory',
  proactive_allowed boolean not null default false,
  created_by_agent text,
  last_used_at timestamptz,
  use_count integer not null default 0,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint preference_memories_scope_chk check (scope in ('global','personal','family','business','project','technical','marketing','sales','finance','health','travel','general')),
  constraint preference_memories_type_chk check (preference_type in ('explicit_preference','inferred_preference','constraint','style_preference','decision_preference','usage_pattern','workflow_pattern','correction','do_not_do')),
  constraint preference_memories_strength_chk check (strength in ('low','medium','high','critical')),
  constraint preference_memories_permission_chk check (permission_level in ('session_only','approved_memory','approved_proactive','do_not_store'))
);

create table if not exists watch_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  container_key text not null,
  scope text not null,
  domain text not null,
  category text,
  item_type text not null,
  item_label text not null,
  item_external_id text,
  description text,
  importance text not null default 'medium',
  status text not null default 'active',
  watch_state text not null default 'candidate',
  inferred_from text,
  inference_reason text,
  watch_for_json jsonb not null default '[]'::jsonb,
  trigger_rules_json jsonb not null default '{}'::jsonb,
  notification_style text not null default 'standard',
  notification_priority text not null default 'medium',
  notification_frequency_limit text not null default 'daily',
  proactive_allowed boolean not null default false,
  confirmation_required boolean not null default true,
  user_confirmed_at timestamptz,
  relevance_score numeric(4,3) not null default 0.500,
  auto_created boolean not null default false,
  last_checked_at timestamptz,
  last_notified_at timestamptz,
  source text,
  created_by_agent text,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint watch_items_importance_chk check (importance in ('low','medium','high','critical')),
  constraint watch_items_status_chk check (status in ('active','paused','completed','archived','dismissed')),
  constraint watch_items_state_chk check (watch_state in ('candidate','active_passive','active_explicit','paused','completed','archived','dismissed')),
  constraint watch_items_inferred_chk check (inferred_from is null or inferred_from in ('favorite_preference','high_strength_preference','repeated_user_interest','active_project','deadline_or_lifecycle','business_risk','business_opportunity','technical_risk','usage_pattern','explicit_user_request')),
  constraint watch_items_priority_chk check (notification_priority in ('low','medium','high','critical','digest_only','silent'))
);

create table if not exists usage_trends (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  container_key text not null,
  scope text not null,
  domain text,
  trend_type text not null,
  trend_label text not null,
  summary text not null,
  evidence_json jsonb not null default '[]'::jsonb,
  frequency_count integer not null default 1,
  confidence numeric(4,3) not null default 0.500,
  recommendation_json jsonb not null default '{}'::jsonb,
  status text not null default 'detected',
  created_by_agent text,
  first_detected_at timestamptz not null default now(),
  last_detected_at timestamptz not null default now(),
  accepted_at timestamptz,
  dismissed_at timestamptz,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint usage_trends_type_chk check (trend_type in ('output_format','agent_usage','container_usage','workflow_repetition','correction_pattern','toolchain_pattern','artifact_pattern','quality_preference','context_boundary','automation_opportunity','new_agent_opportunity','new_skill_opportunity','new_rule_opportunity')),
  constraint usage_trends_status_chk check (status in ('detected','suggested','accepted','dismissed','archived'))
);

create table if not exists proactive_alerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  container_key text not null,
  scope text not null,
  domain text,
  alert_type text not null,
  title text not null,
  message text not null,
  priority text not null default 'medium',
  source_type text,
  source_id uuid,
  reason text,
  action_suggestions_json jsonb not null default '[]'::jsonb,
  status text not null default 'pending',
  generated_by_agent text,
  scheduled_for timestamptz,
  delivered_at timestamptz,
  dismissed_at timestamptz,
  acted_on_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint proactive_alerts_type_chk check (alert_type in ('reminder','recommendation','risk_alert','opportunity_alert','new_release_alert','deadline_alert','trend_alert','usage_pattern_alert','workflow_improvement_alert','agent_suggestion','skill_suggestion','automation_suggestion','rule_suggestion','watch_item_update')),
  constraint proactive_alerts_priority_chk check (priority in ('low','medium','high','critical','digest_only','silent')),
  constraint proactive_alerts_status_chk check (status in ('pending','delivered','dismissed','acted_on','archived','suppressed'))
);

create index if not exists idx_preference_memories_user_container on preference_memories (user_id, container_key);
create index if not exists idx_preference_memories_user_scope_domain on preference_memories (user_id, scope, domain);
create index if not exists idx_preference_memories_type on preference_memories (user_id, preference_type);
create index if not exists idx_watch_items_user_container_status on watch_items (user_id, container_key, status);
create index if not exists idx_watch_items_user_scope_domain on watch_items (user_id, scope, domain);
create index if not exists idx_watch_items_state on watch_items (user_id, watch_state);
create index if not exists idx_usage_trends_user_container_status on usage_trends (user_id, container_key, status);
create index if not exists idx_proactive_alerts_user_status on proactive_alerts (user_id, status);
create index if not exists idx_proactive_alerts_scheduled on proactive_alerts (scheduled_for, status);

alter table preference_memories enable row level security;
alter table watch_items enable row level security;
alter table usage_trends enable row level security;
alter table proactive_alerts enable row level security;

drop policy if exists preference_memories_owner_access on preference_memories;
create policy preference_memories_owner_access on preference_memories
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists watch_items_owner_access on watch_items;
create policy watch_items_owner_access on watch_items
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists usage_trends_owner_access on usage_trends;
create policy usage_trends_owner_access on usage_trends
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists proactive_alerts_owner_access on proactive_alerts;
create policy proactive_alerts_owner_access on proactive_alerts
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
