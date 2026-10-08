# Search page redesign analysis — progress log

Started 2026-10-13. Resume: "continue from analysis/search-redesign/progress.md".

## Schema notes
- ga4_sessions_app: partition `event_date` (date); top-level cols `service`, `event_category`, `event_action`, `platform`, `ga_session_id`, `user_pseudo_id`.

## Steps
- [x] 1. Event discovery (Android + mWeb) — one-day samples 2025-12-02 (old) vs 2026-09-02 (new) Android; 2026-02-03 vs 2026-09-02 mWeb
  PERF: LIKE/OR filters over multi-day ranges time out; always use event_name IN (...) + short windows.
  Android NOT in brief but on search page: search_add_suggestion (44.5k->13.1k), search_continue_locality_search (11.9k->25.1k),
    searched_properties_selected (1.9k both, 'recently searched properties' widget), search_past_filters (2.4k->141),
    search_query_autosuggestion_clicked (9.8k old, ABSENT new), search_dropped (7.9k old, ABSENT new), search_done (new only, 2k),
    locality_select_popular_searches_clicked (4 old), search_clicked_saved_search (4 old), search_view_nearby_locality (tiny),
    app_impression actions: locality_suggestion_view, view_nearby_localities, view_nearby_locality (old only).
  Android in brief but problematic: locality_select_popular_localities_click (does not exist; only 'poplar' typo), locality_select_click_landmark (absent both days),
    search_query_typed (new only, 966/day), search_open_search_tapped (12 old -> 20.7k new: new-only), search_box_clicked (new only, 703).
  event_action just mirrors event name -> no widget sub-id.
  mWeb extra: auto suggestion_search (13.1k -> 926: old suggestion pick, nearly gone), search_add_landmark_suggestion (new only),
    search_near_me_click (old only, 64), search_Click_Next_on_Locality_Search (18.1k -> 1.5k), header_search_on_focus, pyp_hook_hp_search_bar_click (openers),
    query_search_type (typing 69.6k -> 192k), 'Apologies! we do not have that locality ' (no-location, 131 -> 56), search_query_typed (new only).
- [ ] 2. Service field
- [ ] 3. Find update_search_exp firebase key
- [ ] 4. Android update_search_exp metrics
- [ ] 5. firebase_exp_867 recent searches
- [ ] 6. mWeb before/after
- [ ] 7. Stats + write-up

## Android event timeline (biweekly sample days, platform=ANDROID, daily event counts)
- New-UI events (search_box_clicked, search_query_typed, search_done): first seen 2025-12-16 (~6k/day), ~80k Dec30-Feb10, ~180-210k from Feb24 (=> 50/50 then 100% ~Feb 17-24).
  TRACKING GAPS: collapse to <1k on 2026-04-07 and 2026-08-25..09-22 (also 09-02); partial recovery 10-06. => UNRELIABLE, don't use as core metric.
- search_open_search_tapped: ~30/day old -> ramps from 12-16, 5.9k Jan13, 14-28k from Feb. New-UI only.
- serp_search_bar_clicked: 34k/day -> collapses ~12-30 (4k) -> ~1-2k. Old-UI entry; replaced by search_box_clicked.
- search_dropped: 7.5-7.9k/day -> dies 12-16. search_query_autosuggestion_clicked: ~9.8k -> dies 12-16. OLD-ONLY.
- locality_select_suggestion_click: 36-53k -> ~80-95k from 12-30.
- locality_select_recent_searches_clicked: ~5k -> 8.5k Mar24 -> 13k Apr -> 16k May -> 20k Jul28 -> 25k Aug+.
- search_add_suggestion: 45k -> 27k May19 -> 16k Jun30 -> 13k Aug+. search_past_filters: 2.5k -> ~200 by Jun30.
- nearby_locality_add: 12k -> 5k May -> 2k Jul+. hotspot_click: ~300 -> 1.4k Jul28 -> ~900 Sep.
- search_continue_locality_search: 12k -> 18k Jul28 -> 25k Aug+.
- locality_select_click_landmark & locality_select_popular_localities_click: never fire (0 on all 25 sample days).

## Step 3 — experiment key
- New UI (search_done/search_box_clicked/search_query_typed) is NOT key-gated: 86% of search users on 2025-12-30, 92% on 01-13, 95% on 02-10, under every firebase_exp key => app-version rollout from 2025-12-16.
- Keys 806-817 on 02-10: no uneven split.
- **firebase_exp_827 = update_search_exp** (2026-03-10, Android): session_start users 106,793 (v0) vs 106,751 (v1); page users 20,456 vs 20,227;
  search_open_search_tapped users 4,857 vs 5,460 (+12%), search_add_suggestion users 7,654 vs 6,204 (-19%), recent 1,984 vs 2,096. => v1 = new.
- Bonus: firebase_exp_832 (search-user-targeted, ~9k sess users/variant) recent_searches users 465 (v0) vs 1,059 (v1) => early recent-searches test?
- Query pattern used: GROUP BY user -> MAX(transform(filter(user_properties,...))) -> explode the per-user small array (not raw rows).
