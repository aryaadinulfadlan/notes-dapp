#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("Count3AcZucFDPSFBAeHkQ6AvttieKUkyJ8HiQGhQwe");

#[program]
pub mod notesdapp {
    use super::*;

    pub fn close(_ctx: Context<CloseNotesdapp>) -> Result<()> {
        Ok(())
    }

    pub fn decrement(ctx: Context<Update>) -> Result<()> {
        ctx.accounts.notesdapp.count = ctx.accounts.notesdapp.count.checked_sub(1).unwrap();
        Ok(())
    }

    pub fn increment(ctx: Context<Update>) -> Result<()> {
        ctx.accounts.notesdapp.count = ctx.accounts.notesdapp.count.checked_add(1).unwrap();
        Ok(())
    }

    pub fn initialize(_ctx: Context<InitializeNotesdapp>) -> Result<()> {
        Ok(())
    }

    pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
        ctx.accounts.notesdapp.count = value.clone();
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeNotesdapp<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
  init,
  space = 8 + Notesdapp::INIT_SPACE,
  payer = payer
    )]
    pub notesdapp: Account<'info, Notesdapp>,
    pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseNotesdapp<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
  mut,
  close = payer, // close account and return lamports to payer
    )]
    pub notesdapp: Account<'info, Notesdapp>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub notesdapp: Account<'info, Notesdapp>,
}

#[account]
#[derive(InitSpace)]
pub struct Notesdapp {
    count: u8,
}
